'use server';

import {
  generateClimateResilientStrategies,
  type GenerateClimateResilientStrategiesOutput,
} from '@/ai/flows/generate-climate-resilient-strategies';
import { z } from 'zod';
import { getCoordinates, getNasaPowerData, NasaPowerData } from './services/nasa';

const formSchema = z.object({
  city: z.string().min(2, 'Please provide a valid city name.'),
  cityOverview: z.string().min(50, 'Please provide a more detailed overview.'),
});

// Mock data to simulate complex data inputs for the AI model
const mockUrbanVulnerabilityIndex = (nasaData: NasaPowerData) => JSON.stringify({
  "district_A": { 
    "heat_exposure_risk": nasaData.T2M, // Using actual temp data
    "relative_humidity": nasaData.RH2M, // Using actual humidity data
    "air_quality_index": 152, 
    "green_space_access": "low", 
    "population_density": 4500, 
    "vulnerable_population_ratio": 0.4 
  },
  "district_B": { 
    "heat_exposure_risk": nasaData.T2M - 2, // Simulating a cooler district
    "relative_humidity": nasaData.RH2M - 5,
    "air_quality_index": 95, 
    "green_space_access": "high", 
    "population_density": 2100, 
    "vulnerable_population_ratio": 0.15 
  },
  "district_C": { 
    "flood_risk": "high", 
    "heat_exposure_risk": nasaData.T2M + 1.5, // Simulating a hotter district
    "relative_humidity": nasaData.RH2M + 7,
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
): Promise<{ data: GenerateClimateResilientStrategiesOutput | null; error: string | null; }> {
  const validatedFields = formSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      data: null,
      error: 'Invalid input.',
    };
  }
  
  try {
    const { city, cityOverview } = validatedFields.data;
    
    // 1. Get coordinates for the city
    const coordinates = await getCoordinates(city);
    if (!coordinates) {
      return { data: null, error: `Could not find coordinates for ${city}. Please try a different city.` };
    }

    // 2. Get NASA POWER data for the coordinates
    const nasaData = await getNasaPowerData(coordinates.lat, coordinates.lon);
    if (!nasaData) {
      return { data: null, error: 'Could not retrieve weather data from NASA POWER API.' };
    }

    // 3. Generate strategies using the real data
    const output = await generateClimateResilientStrategies({
      urbanVulnerabilityIndex: mockUrbanVulnerabilityIndex(nasaData),
      ecosystemServiceModelerOutput: mockEcosystemServiceModelerOutput,
      cityOverview: cityOverview,
    });
    return { data: output, error: null };
  } catch (error) {
    console.error('Error generating strategies:', error);
    let errorMessage = 'Failed to generate strategies. Please try again.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return { data: null, error: errorMessage };
  }
}
