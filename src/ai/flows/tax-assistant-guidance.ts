'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing tax guidance using an AI assistant.
 *
 * It includes:
 * - taxAssistantGuidance: The main function to initiate the tax guidance flow.
 * - TaxAssistantGuidanceInput: The input type for the taxAssistantGuidance function, defining the user's question.
 * - TaxAssistantGuidanceOutput: The output type for the taxAssistantGuidance function, providing the AI's response.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const TaxAssistantGuidanceInputSchema = z.object({
  question: z.string().describe('The user tax question.'),
});
export type TaxAssistantGuidanceInput = z.infer<typeof TaxAssistantGuidanceInputSchema>;

const TaxAssistantGuidanceOutputSchema = z.object({
  answer: z.string().describe('The AI assistant tax answer.'),
});
export type TaxAssistantGuidanceOutput = z.infer<typeof TaxAssistantGuidanceOutputSchema>;

export async function taxAssistantGuidance(input: TaxAssistantGuidanceInput): Promise<TaxAssistantGuidanceOutput> {
  return taxAssistantGuidanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'taxAssistantGuidancePrompt',
  input: {
    schema: z.object({
      question: z.string().describe('The user tax question.'),
    }),
  },
  output: {
    schema: z.object({
      answer: z.string().describe('The AI assistant tax answer.'),
    }),
  },
  prompt: `You are a helpful AI tax assistant for Colombian businesses.

  A user has asked the following question:
  {{question}}

  Provide a concise and accurate answer.`,
});

const taxAssistantGuidanceFlow = ai.defineFlow<
  typeof TaxAssistantGuidanceInputSchema,
  typeof TaxAssistantGuidanceOutputSchema
>(
  {
    name: 'taxAssistantGuidanceFlow',
    inputSchema: TaxAssistantGuidanceInputSchema,
    outputSchema: TaxAssistantGuidanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
