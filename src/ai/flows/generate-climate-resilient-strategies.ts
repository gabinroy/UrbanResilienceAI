// use server'

/**
 * @fileOverview A climate resilient strategies AI agent.
 *
 * - generateClimateResilientStrategies - A function that handles the generation of climate resilient strategies.
 * - GenerateClimateResilientStrategiesInput - The input type for the generateClimateResilientStrategies function.
 * - GenerateClimateResilientStrategiesOutput - The return type for the generateClimateResilientStrategies function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateClimateResilientStrategiesInputSchema = z.object({
  urbanVulnerabilityIndex: z.string().describe('The urban vulnerability index data.'),
  ecosystemServiceModelerOutput: z.string().describe('The ecosystem service modeler output data.'),
  cityOverview: z.string().describe('A general overview of the city including demographics, infrastructure, and key environmental challenges.'),
});
export type GenerateClimateResilientStrategiesInput = z.infer<typeof GenerateClimateResilientStrategiesInputSchema>;

const GenerateClimateResilientStrategiesOutputSchema = z.object({
  strategies: z.array(
    z.object({
      strategyName: z.string().describe('The name of the climate resilient strategy.'),
      description: z.string().describe('A detailed description of the strategy.'),
      justification: z.string().describe('The data-driven justification for the strategy based on the UVI and ESM outputs.'),
      expectedBenefits: z.string().describe('Quantifiable improvements in human well-being and environmental health.'),
      implementationDetails: z.string().describe('Specific steps for implementing the strategy, including resource allocation and stakeholder engagement.'),
    })
  ).describe('A list of climate resilient strategies.'),
});
export type GenerateClimateResilientStrategiesOutput = z.infer<typeof GenerateClimateResilientStrategiesOutputSchema>;

export async function generateClimateResilientStrategies(input: GenerateClimateResilientStrategiesInput): Promise<GenerateClimateResilientStrategiesOutput> {
  return generateClimateResilientStrategiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateClimateResilientStrategiesPrompt',
  input: {schema: GenerateClimateResilientStrategiesInputSchema},
  output: {schema: GenerateClimateResilientStrategiesOutputSchema},
  prompt: `You are an expert urban planner specializing in climate resilience.

  Based on the urban vulnerability index, ecosystem service modeler outputs, and a general overview of the city, propose specific, data-informed planning recommendations.

  Urban Vulnerability Index: {{{urbanVulnerabilityIndex}}}
  Ecosystem Service Modeler Output: {{{ecosystemServiceModelerOutput}}}
  City Overview: {{{cityOverview}}}

  Consider strategies such as optimal placement for new cooling centers, prioritization of green infrastructure investment, or adjusted building codes.
  Demonstrate a quantifiable improvement in both human well-being (e.g., reduced heat-related illness) and environmental health (e.g., increased tree canopy cover).

  Output a list of strategies.  Each strategy should include the strategy name, a detailed description, the data-driven justification (based on the UVI and ESM outputs), the expected benefits, and implementation details.
  Ensure that the strategies address the specific vulnerabilities and leverage the ecosystem services identified in the provided data.
  `, 
});

const generateClimateResilientStrategiesFlow = ai.defineFlow(
  {
    name: 'generateClimateResilientStrategiesFlow',
    inputSchema: GenerateClimateResilientStrategiesInputSchema,
    outputSchema: GenerateClimateResilientStrategiesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
