'use server';

import {
  generateClimateResilientStrategies,
  type GenerateClimateResilientStrategiesOutput,
} from '@/ai/flows/generate-climate-resilient-strategies';
import { generateCityDescription, generateCityDescriptionFromCityName } from '@/ai/flows/generate-city-description';
import { z } from 'zod';
import { getCoordinates, getNasaPowerData, NasaPowerData } from './services/nasa';

const formSchema = z.object({
  city: z.string().min(2, 'Please provide a valid city name.'),
  cityOverview: z.string().optional(),
});

// Mock data to simulate complex data inputs for the AI model
const mockUrbanVulnerabilityIndex = (nasaData: NasaPowerData | null) => JSON.stringify({
  "district_A": { 
    "heat_exposure_risk": nasaData?.T2M ?? 28, // Use default if null
    "relative_humidity": nasaData?.RH2M ?? 65, // Use default if null
    "air_quality_index": 152, 
    "green_space_access": "low", 
    "population_density": 4500, 
    "vulnerable_population_ratio": 0.4 
  },
  "district_B": { 
    "heat_exposure_risk": nasaData ? nasaData.T2M - 2 : 26, // Simulate a cooler district
    "relative_humidity": nasaData ? nasaData.RH2M - 5 : 60,
    "air_quality_index": 95, 
    "green_space_access": "high", 
    "population_density": 2100, 
    "vulnerable_population_ratio": 0.15 
  },
  "district_C": { 
    "flood_risk": "high", 
    "heat_exposure_risk": nasaData ? nasaData.T2M + 1.5 : 29.5, // Simulating a hotter district
    "relative_humidity": nasaData ? nasaData.RH2M + 7 : 72,
    "air_quality_index": 120, 
    "green_space_access": "medium", 
    "population_density": 3200, 
    "vulnerable_population_ratio": 0.25 
  },
});

const mockEcosystemServiceModelerOutput = JSON.stringify({
  "park_Central": { "cooling_effect_celsius": -3.5, "stormwater_retention_m3": 50000, "air_pollutant_removal_tons_yr": 12.5 },
  "river_Greenway": { "cooling_effect_celsius": -2.8, "biodiversity_index": 0.78, "recreational_value_score": 0.9 },
  "urban_Forest_North": { "carbon_sequestration_tons_yr": 1500, "cooling_effect_celsius": -4.2, "air_pollutant_removal_tons_yr": 25.0 },
});


export async function getStrategies(
  values: z.infer<typeof formSchema>
): Promise<{ data: GenerateClimateResilientStrategiesOutput | null; error: string | null; notification: string | null; }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      error: 'Invalid input.',
      notification: null,
    };
  }
  
  try {
    const { city } = validatedFields.data;
    let { cityOverview } = validatedFields.data;
    let notification: string | null = null;
    
    // 1. Get coordinates for the city
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      return { data: null, error: `Could not find coordinates for ${city}. Please try a different city.`, notification: null };
    }

    // 2. Get NASA POWER data for the coordinates
    let nasaData = await getNasaPowerData(coordinates.lat, coordinates.lon);
    
    // 3. Generate city overview if it's not provided
    if (!cityOverview || cityOverview.trim().length === 0) {
        if (nasaData) {
            // Generate overview from NASA data
            const descriptionOutput = await generateCityDescription({ city, nasaData });
            cityOverview = descriptionOutput.cityOverview;
        } else {
            // If NASA data fails, generate overview from just the city name
            notification = `Could not retrieve weather data for ${city}. Generating a plausible city overview with AI as a fallback.`;
            const descriptionOutput = await generateCityDescriptionFromCityName({ city });
            cityOverview = descriptionOutput.cityOverview;
        }
    }

    // 4. Generate strategies using the real data and overview
    const output = await generateClimateResilientStrategies({
      urbanVulnerabilityIndex: mockUrbanVulnerabilityIndex(nasaData), // This will use defaults if nasaData is null
      ecosystemServiceModelerOutput: mockEcosystemServiceModelerOutput,
      cityOverview: cityOverview,
    });
    
    return { data: output, error: null, notification: notification };
  } catch (error) {
    console.error('Error generating strategies:', error);
    let errorMessage = 'Failed to generate strategies. Please try again.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { data: null, error: errorMessage, notification: null };
  }
}
