'use server';

import {
  generateClimateResilientStrategies,
  type GenerateClimateResilientStrategiesOutput,
} from '@/ai/flows/generate-climate-resilient-strategies';
import { z } from 'zod';

const formSchema = z.object({
  cityOverview: z.string().min(50, 'Please provide a more detailed overview.'),
});

// Mock data to simulate complex data inputs for the AI model
const mockUrbanVulnerabilityIndex = JSON.stringify({
  "district_A": { "heat_exposure_risk": 0.85, "air_quality_index": 152, "green_space_access": "low", "population_density": 4500, "vulnerable_population_ratio": 0.4 },
  "district_B": { "heat_exposure_risk": 0.60, "air_quality_index": 95, "green_space_access": "high", "population_density": 2100, "vulnerable_population_ratio": 0.15 },
  "district_C": { "flood_risk": "high", "heat_exposure_risk": 0.70, "air_quality_index": 120, "green_space_access": "medium", "population_density": 3200, "vulnerable_population_ratio": 0.25 },
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
    const output = await generateClimateResilientStrategies({
      urbanVulnerabilityIndex: mockUrbanVulnerabilityIndex,
      ecosystemServiceModelerOutput: mockEcosystemServiceModelerOutput,
      cityOverview: validatedFields.data.cityOverview,
    });
    return { data: output, error: null };
  } catch (error) {
    console.error('Error generating strategies:', error);
    return { data: null, error: 'Failed to generate strategies. Please try again.' };
  }
}
