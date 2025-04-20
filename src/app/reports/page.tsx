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
import Link from "next/link";
import { Icons } from "@/components/icons";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const FinancialReportsPage = () => {
  const [reportData, setReportData] = useState([
    { id: 1, name: "Income Statement", date: new Date(), type: "PDF" },
    { id: 2, name: "Balance Sheet", date: new Date(), type: "Excel" },
    { id: 3, name: "Cash Flow Statement", date: new Date(), type: "PDF" },
  ]);
  const [date, setDate] = React.useState<DateRange>({
    from: new Date(2023, 0, 1),
    to: new Date(),
  })

  useEffect(() => {
    // Simulate fetching report data from an API
    // In a real application, this would be an API call
    // For demonstration purposes, we're using dummy data
    const fetchData = async () => {
      // Simulate an API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Set dummy report data
      setReportData([
        { id: 1, name: "Income Statement", date: new Date(), type: "PDF" },
        { id: 2, name: "Balance Sheet", date: new Date(), type: "Excel" },
        { id: 3, name: "Cash Flow Statement", date: new Date(), type: "PDF" },
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
        <h1 className="text-3xl font-bold mb-6">Financial Reports Module</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                {reportData.map((report) => (
                  <li key={report.id} className="py-2">
                    {report.name} - {format(report.date, "PPP")}
                    <Button variant="secondary" className="ml-2">
                      Download ({report.type})
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Report Filters</CardTitle>
              <CardDescription>Customize your report generation</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Date Range Picker */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Date Range</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date?.from || !date?.to
                          ? "text-muted-foreground"
                          : undefined
                      )}
                    >
                      <Icons.calendar className="mr-2 h-4 w-4" />
                      {date?.from ? (
                        date.to ? (
                          `${format(date.from, "PPP")} - ${format(date.to, "PPP")}`
                        ) : (
                          format(date.from, "PPP")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="center" side="bottom">
                    <Calendar
                      mode="range"
                      defaultMonth={date?.from}
                      selected={date}
                      onSelect={setDate}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Additional filters can be added here (e.g., account, area) */}
            </CardContent>
          </Card>

          {/* Export Options Card */}
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
              <CardDescription>Choose your export format</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                <li className="py-2">
                  <Button variant="secondary">Export to Excel</Button>
                </li>
                <li className="py-2">
                  <Button variant="secondary">Export to PDF</Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialReportsPage;
