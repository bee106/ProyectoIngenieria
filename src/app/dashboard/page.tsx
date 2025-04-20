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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';


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
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date()); // Use state for current date


  useEffect(() => {
    // Update data periodically (optional)
    const intervalId = setInterval(() => {
      const newIncomeExpenseData = generateRandomData(12, 5000, 4000);
      setIncomeExpenseData(newIncomeExpenseData);
      setInvoiceStatusData(generateInvoiceData(4));

      // Calculate total balance and expenses
      const totalIncome = newIncomeExpenseData.reduce((sum, data) => sum + data.income, 0);
      const totalExpenses = newIncomeExpenseData.reduce((sum, data) => sum + data.expenses, 0);

      setBalance(totalIncome - totalExpenses);
      setExpenses(totalExpenses);

      setCurrentDate(new Date()); // Update the current date
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

          {/* Balance Card */}
          <Card className="tributo-card">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Current balance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="tributo-card">
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
              <CardDescription>Total expenses this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${expenses.toFixed(2)}</div>
            </CardContent>
          </Card>

          {/* Expense Control Card */}
          <Card className="tributo-card">
            <CardHeader>
              <CardTitle>Expense Control</CardTitle>
              <CardDescription>Manage and control your expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-40">
                <ul>
                  {incomeExpenseData.map((item, index) => (
                    <li key={index} className="py-2">
                      {item.name}: <span className="font-semibold">${item.expenses.toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
              <Button variant="secondary" className="mt-4">
                View All Expenses
              </Button>
            </CardContent>
          </Card>
        </div>
          {/* Current Date Display */}
          <div className="mt-4 text-muted-foreground">
            Today is: {format(currentDate, 'PPP', { locale: enUS })}
          </div>
      </div>
    </div>
  );
}
