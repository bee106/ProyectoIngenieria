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
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Dummy data for clients
const clients = [
  {
    id: 1,
    name: "Acme Corp",
    contact: "John Doe",
    email: "john.doe@acme.com",
    phone: "300-123-4567",
  },
  {
    id: 2,
    name: "Beta Industries",
    contact: "Jane Smith",
    email: "jane.smith@beta.com",
    phone: "310-987-6543",
  },
  {
    id: 3,
    name: "Gamma Solutions",
    contact: "Alice Johnson",
    email: "alice.johnson@gamma.com",
    phone: "320-555-1212",
  },
];

export default function ClientsPage() {
  return (
    <div className="p-6">
      <Card className="tributo-card">
        <CardHeader>
          <CardTitle>Clients</CardTitle>
          <CardDescription>Manage your clients here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.id}</TableCell>
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.contact}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
