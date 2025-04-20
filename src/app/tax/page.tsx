"use client";

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { Input } from "@/components/ui/input";

const TaxPage = () => {
  const [taxData, setTaxData] = useState([
    { id: 1, type: "VAT", amount: 2000, dueDate: addDays(new Date(), 10), status: "Pending" },
    { id: 2, type: "Income Tax", amount: 5000, dueDate: addDays(new Date(), 30), status: "Paid" },
    { id: 3, type: "ICA", amount: 1000, dueDate: addDays(new Date(), 20), status: "Pending" },
  ]);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())

  useEffect(() => {
    // Simulate fetching tax data from an API
    // In a real application, this would be an API call
    // For demonstration purposes, we're using dummy data
    const fetchData = async () => {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Set dummy tax data
      setTaxData([
        { id: 1, type: "VAT", amount: 2000, dueDate: addDays(new Date(), 10), status: "Pending" },
        { id: 2, type: "Income Tax", amount: 5000, dueDate: addDays(new Date(), 30), status: "Paid" },
        { id: 3, type: "ICA", amount: 1000, dueDate: addDays(new Date(), 20), status: "Pending" },
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <nav className="bg-secondary p-4 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.home className="h-5 w-5" />
            <span className="font-bold">Dashboard</span>
          </Link>
          <span className="font-semibold text-lg">FISCO</span>
        </div>
      </nav>

      <div className="container mx-auto py-10 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-6">Tax Module</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Upcoming Tax Due Dates</CardTitle>
              <CardDescription>View upcoming tax deadlines</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxData.map((tax) => (
                    <TableRow key={tax.id}>
                      <TableCell>{tax.type}</TableCell>
                      <TableCell>${tax.amount.toFixed(2)}</TableCell>
                      <TableCell>{format(tax.dueDate, "PPP")}</TableCell>
                      <TableCell>{tax.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Tax Calendar</CardTitle>
              <CardDescription>Keep track of important tax dates</CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto p-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <Icons.calendar className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center" side="bottom">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) =>
                      date > new Date() || date < new Date("2020-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Tax Forms</CardTitle>
              <CardDescription>Generate and download tax forms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                <li className="py-2">
                  <Button variant="secondary">Form 1001</Button>
                </li>
                <li className="py-2">
                  <Button variant="secondary">Form 110</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxPage;
