"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy invoice data
const invoices = [
  {
    invoiceNumber: "INV-2024-001",
    issueDate: "2024-01-20",
    dueDate: "2024-02-20",
    recipient: "Acme Corp",
    totalAmount: 1000,
    status: "Sent",
  },
  {
    invoiceNumber: "INV-2024-002",
    issueDate: "2024-02-15",
    dueDate: "2024-03-15",
    recipient: "Beta Industries",
    totalAmount: 1500,
    status: "Paid",
  },
  {
    invoiceNumber: "INV-2024-003",
    issueDate: "2024-03-01",
    dueDate: "2024-03-31",
    recipient: "Gamma Solutions",
    totalAmount: 2000,
    status: "Overdue",
  },
];

export default function InvoicesPage() {
  return (
    <div className="p-6">
      <Card className="tributo-card">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
          <CardDescription>Create and manage your invoices.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice Number</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Recipient</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoiceNumber}>
                  <TableCell>{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.issueDate}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>{invoice.recipient}</TableCell>
                  <TableCell>{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
