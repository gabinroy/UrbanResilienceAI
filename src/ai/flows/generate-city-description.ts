'use server';

/**
 * @fileOverview A flow to generate a city description from NASA POWER data.
 *
 * - generateCityDescription - A function to generate a description.
 * - GenerateCityDescriptionInput - The input type for the function.
 * - GenerateCityDescriptionOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateCityDescriptionInputSchema = z.object({
  city: z.string().describe('The name of the city.'),
  nasaData: z.object({
    T2M: z.number().describe('Temperature at 2 Meters in Celsius.'),
    RH2M: z.number().describe('Relative Humidity at 2 Meters as a percentage.'),
  }).describe('The weather data from NASA POWER API.'),
});
export type GenerateCityDescriptionInput = z.infer<typeof GenerateCityDescriptionInputSchema>;

const GenerateCityDescriptionOutputSchema = z.object({
  cityOverview: z.string().describe('A generated overview of the city based on the provided data, including potential challenges.'),
});
export type GenerateCityDescriptionOutput = z.infer<typeof GenerateCityDescriptionOutputSchema>;

export async function generateCityDescription(
  input: GenerateCityDescriptionInput
): Promise<GenerateCityDescriptionOutput> {
  return generateCityDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCityDescriptionPrompt',
  input: { schema: GenerateCityDescriptionInputSchema },
  output: { schema: GenerateCityDescriptionOutputSchema },
  prompt: `You are an expert urban analyst. Based on the provided city name and NASA weather data, generate a brief, one-paragraph overview of the city.

This overview should describe the city and mention its key environmental challenges based on the data. For example, a high temperature and humidity might suggest challenges like heatwaves and stress on cooling infrastructure.

City: {{{city}}}
Temperature (Celsius): {{{nasaData.T2M}}}
Relative Humidity (%): {{{nasaData.RH2M}}}

Generate the cityOverview.`,
});


const generateCityDescriptionFlow = ai.defineFlow(
  {
    name: 'generateCityDescriptionFlow',
    inputSchema: GenerateCityDescriptionInputSchema,
    outputSchema: GenerateCityDescriptionOutputSchema,
  },
  async input => {
    const { output } = await prompt(input);
    return output!;
  }
);
