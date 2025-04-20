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
import Link from "next/link";
import { Icons } from "@/components/icons";

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
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-secondary p-4 border-b border-border">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.home className="h-5 w-5" />
            <span className="font-bold">Dashboard</span>
          </Link>
        </div>
      </nav>

      <div className="flex-grow p-6">
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
    </div>
  );
}
