/**
 * Represents an invoice item.
 */
export interface InvoiceItem {
  /**
   * The name or description of the item.
   */
  name: string;
  /**
   * The quantity of the item.
   */
  quantity: number;
  /**
   * The unit price of the item.
   */
  unitPrice: number;
}

/**
 * Represents an invoice.
 */
export interface Invoice {
  /**
   * The invoice number.
   */
  invoiceNumber: string;
  /**
   * The date the invoice was issued.
   */
  issueDate: string;
  /**
   * The due date for the invoice.
   */
  dueDate: string;
  /**
   * The recipient's name or company name.
   */
  recipient: string;
  /**
   * The list of items included in the invoice.
   */
  items: InvoiceItem[];
  /**
   * The total amount due.
   */
  totalAmount: number;
  /**
   * The status of the invoice (e.g., Draft, Sent, Paid).
   */
  status: string;
}

/**
 * Asynchronously retrieves an invoice by its invoice number.
 *
 * @param invoiceNumber The invoice number to retrieve.
 * @returns A promise that resolves to an Invoice object.
 */
export async function getInvoice(invoiceNumber: string): Promise<Invoice> {
  // TODO: Implement this by calling an API.

  return {
    invoiceNumber: 'INV-2024-001',
    issueDate: '2024-01-20',
    dueDate: '2024-02-20',
    recipient: 'Acme Corp',
    items: [
      {
        name: 'Consulting',
        quantity: 10,
        unitPrice: 100,
      },
    ],
    totalAmount: 1000,
    status: 'Sent',
  };
}

/**
 * Asynchronously sends an invoice.
 *
 * @param invoice The invoice to send.
 * @returns A promise that resolves to true if the invoice was sent successfully.
 */
export async function sendInvoice(invoice: Invoice): Promise<boolean> {
  // TODO: Implement this by calling an API.

  return true;
}
