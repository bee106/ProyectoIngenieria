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
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const generateRandomData = (count: number, maxIncome: number, maxExpenses: number) => {
  return Array.from({ length: count }, (_, i) => ({
    name: `Month ${i + 1}`,
    income: Math.floor(Math.random() * maxIncome),
    expenses: Math.floor(Math.random() * maxExpenses),
  }));
};

const AccountingPage = () => {
  const [incomeExpenseData, setIncomeExpenseData] = useState(() => generateRandomData(12, 5000, 4000));
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIncomeExpenseData = generateRandomData(12, 5000, 4000);
      setIncomeExpenseData(newIncomeExpenseData);

      const totalIncome = newIncomeExpenseData.reduce((sum, data) => sum + data.income, 0);
      const totalExpenses = newIncomeExpenseData.reduce((sum, data) => sum + data.expenses, 0);

      setBalance(totalIncome - totalExpenses);
      setExpenses(totalExpenses);

      setCurrentDate(new Date());
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  // Dummy data for accounts (replace with actual data fetching)
  const accounts = [
    { id: 1, name: "Cash", type: "Asset", balance: 5000 },
    { id: 2, name: "Accounts Receivable", type: "Asset", balance: 3000 },
    { id: 3, name: "Accounts Payable", type: "Liability", balance: 1500 },
  ];

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
        <h1 className="text-3xl font-bold mb-6">Accounting Module</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Income vs Expenses Chart */}
          <Card className="shadow-md rounded-lg overflow-hidden">
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

          {/* Balance Card */}
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Balance</CardTitle>
              <CardDescription>Current balance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
            </CardContent>
          </Card>

          {/* Expenses Card */}
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Expenses</CardTitle>
              <CardDescription>Total expenses this period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${expenses.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Accounts</CardTitle>
              <CardDescription>Manage your accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Balance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accounts.map((account) => (
                    <TableRow key={account.id}>
                      <TableCell>{account.id}</TableCell>
                      <TableCell>{account.name}</TableCell>
                      <TableCell>{account.type}</TableCell>
                      <TableCell>${account.balance.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Expense Control Card */}
          <Card className="shadow-md rounded-lg overflow-hidden">
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
        <div className="mt-4 text-muted-foreground">
          Today is: {format(currentDate, 'PPP', { locale: enUS })}
        </div>
      </div>
    </div>
  );
};

export default AccountingPage;
