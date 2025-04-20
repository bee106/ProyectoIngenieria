"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { generateRandomData } from "@/lib/utils";

export default function Home() {
  const [incomeExpenseData, setIncomeExpenseData] = useState(() => generateRandomData(12, 5000, 4000));
  const [balance, setBalance] = useState(0);
  const [expenses, setExpenses] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newIncomeExpenseData = generateRandomData(12, 5000, 4000);
      setIncomeExpenseData(newIncomeExpenseData);

      const totalIncome = newIncomeExpenseData.reduce((sum, data) => sum + data.income, 0);
      const totalExpenses = newIncomeExpenseData.reduce((sum, data) => sum + data.expenses, 0);

      setBalance(totalIncome - totalExpenses);
      setExpenses(totalExpenses);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="md:flex h-screen bg-background">
      <Sidebar className="w-64 md:block hidden">
        <SidebarHeader>
          <div className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="font-bold">FISCO</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-full">
            <SidebarMenu>
              <SidebarMenuButton>
                <Link href="/dashboard">
                  <Icons.home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/accounting">
                  <Icons.book className="mr-2 h-4 w-4" />
                  <span>Accounting</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/tax">
                  <Icons.calculator className="mr-2 h-4 w-4" />
                  <span>Tax</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/reports">
                  <Icons.scale className="mr-2 h-4 w-4" />
                  <span>Reports</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/clients">
                  <Icons.users className="mr-2 h-4 w-4" />
                  <span>Clients</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/invoices">
                  <Icons.fileText className="mr-2 h-4 w-4" />
                  <span>Invoices</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/ai-assistant">
                  <Icons.messageCircle className="mr-2 h-4 w-4" />
                  <span>AI Tax Assistant</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/blog">
                  <Icons.blocks className="mr-2 h-4 w-4" />
                  <span>Blog</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/settings">
                  <Icons.settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Link href="/support">
                  <Icons.help className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/200/200" alt="Avatar" />
              <AvatarFallback>TC</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">John Doe</span>
          </div>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

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

        </div>
      </div>
    </div>
  );
}
