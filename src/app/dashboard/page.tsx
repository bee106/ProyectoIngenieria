"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";

// Function to generate random data for charts
const generateRandomData = (count: number, maxIncome: number, maxExpenses: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Month ${i + 1}`,
    income: Math.floor(Math.random() * maxIncome),
    expenses: Math.floor(Math.random() * maxExpenses),
  }));
};

const generateInvoiceData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: ["Sent", "Paid", "Overdue", "Draft"][i % 4],
    value: Math.floor(Math.random() * 500),
  }));
};

const COLORS = ["#1E88E5", "#43A047", "#FDD835", "#FB8C00"]; // More vibrant colors

export default function DashboardPage() {
  const [incomeExpenseData, setIncomeExpenseData] = useState(() => generateRandomData(12, 5000, 4000));
  const [invoiceStatusData, setInvoiceStatusData] = useState(() => generateInvoiceData(4));

  useEffect(() => {
    // Update data periodically (optional)
    const intervalId = setInterval(() => {
      setIncomeExpenseData(generateRandomData(12, 5000, 4000));
      setInvoiceStatusData(generateInvoiceData(4));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-secondary p-4 border-b border-border">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.home className="h-5 w-5" />
            <span className="font-bold">Dashboard</span>
          </Link>
          <span className="font-semibold text-lg">FISCO</span>
        </div>
      </nav>

      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {/* Income vs Expenses Chart */}
          <Card className="tributo-card">
            <CardHeader>
              <CardTitle>Income vs Expenses</CardTitle>
              <CardDescription>Overview of your financial health</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart
                  data={incomeExpenseData}
                  margin={{
                    top: 5,
                    right: 20,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="hsl(var(--chart-1))"
                    fill="hsl(var(--chart-1))"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Smart Invoicing Status Chart */}
          <Card className="tributo-card">
            <CardHeader>
              <CardTitle>Smart Invoicing Status</CardTitle>
              <CardDescription>Track your invoice status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
