'use server';
/**
 * @fileOverview A flow for classifying invoice data using AI.
 *
 * - classifyInvoiceData - A function that takes invoice document URL and classifies the data.
 * - ClassifyInvoiceDataInput - The input type for the classifyInvoiceData function.
 * - ClassifyInvoiceDataOutput - The return type for the classifyInvoiceData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ClassifyInvoiceDataInputSchema = z.object({
  invoiceDocumentUrl: z.string().describe('The URL of the invoice document.'),
});
export type ClassifyInvoiceDataInput = z.infer<typeof ClassifyInvoiceDataInputSchema>;

const ClassifyInvoiceDataOutputSchema = z.object({
  invoiceNumber: z.string().describe('The invoice number.'),
  issueDate: z.string().describe('The date the invoice was issued.'),
  dueDate: z.string().describe('The due date for the invoice.'),
  recipient: z.string().describe('The recipient of the invoice.'),
  items: z.array(
    z.object({
      name: z.string().describe('The name or description of the item.'),
      quantity: z.number().describe('The quantity of the item.'),
      unitPrice: z.number().describe('The unit price of the item.'),
    })
  ).describe('The list of items included in the invoice.'),
  totalAmount: z.number().describe('The total amount due.'),
});
export type ClassifyInvoiceDataOutput = z.infer<typeof ClassifyInvoiceDataOutputSchema>;

export async function classifyInvoiceData(input: ClassifyInvoiceDataInput): Promise<ClassifyInvoiceDataOutput> {
  return classifyInvoiceDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyInvoiceDataPrompt',
  input: {
    schema: z.object({
      invoiceDocumentUrl: z.string().describe('The URL of the invoice document.'),
    }),
  },
  output: {
    schema: z.object({
      invoiceNumber: z.string().describe('The invoice number.'),
      issueDate: z.string().describe('The date the invoice was issued.'),
      dueDate: z.string().describe('The due date for the invoice.'),
      recipient: z.string().describe('The recipient of the invoice.'),
      items: z.array(
        z.object({
          name: z.string().describe('The name or description of the item.'),
          quantity: z.number().describe('The quantity of the item.'),
          unitPrice: z.number().describe('The unit price of the item.'),
        })
      ).describe('The list of items included in the invoice.'),
      totalAmount: z.number().describe('The total amount due.'),
    }),
  },
  prompt: `You are an expert in extracting data from invoices.
  Extract the following information from the invoice document at the given URL: {{{invoiceDocumentUrl}}}.
  Return the data in JSON format.
  Make sure the extracted data is accurate and complete.

  Output:
  {
    "invoiceNumber": "",
    "issueDate": "",
    "dueDate": "",
    "recipient": "",
    "items": [
      {
        "name": "",
        "quantity": 0,
        "unitPrice": 0
      }
    ],
    "totalAmount": 0
  }`,
});

const classifyInvoiceDataFlow = ai.defineFlow<
  typeof ClassifyInvoiceDataInputSchema,
  typeof ClassifyInvoiceDataOutputSchema
>({
  name: 'classifyInvoiceDataFlow',
  inputSchema: ClassifyInvoiceDataInputSchema,
  outputSchema: ClassifyInvoiceDataOutputSchema,
}, async input => {
  const {output} = await prompt(input);
  return output!;
});
