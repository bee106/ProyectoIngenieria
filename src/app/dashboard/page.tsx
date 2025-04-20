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
} from "recharts";

const data = [
  {name: "Jan", income: 4000, expenses: 2400},
  {name: "Feb", income: 3000, expenses: 1398},
  {name: "Mar", income: 2000, expenses: 9800},
  {name: "Apr", income: 2780, expenses: 3908},
  {name: "May", income: 1890, expenses: 4800},
  {name: "Jun", income: 2390, expenses: 3800},
  {name: "Jul", income: 3490, expenses: 4300},
];

const invoiceData = [
  {name: "Sent", value: 400},
  {name: "Paid", value: 300},
  {name: "Overdue", value: 200},
  {name: "Draft", value: 100},
];

const financialNews = [
  {
    title: "The Impact of Inflation on Small Businesses",
    content:
      "Inflation can significantly affect small businesses. Here's how to navigate...",
    link: "#",
  },
  {
    title: "Tax Credits for Small Business Owners",
    content: "Discover the tax credits available for small business owners...",
    link: "#",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Income vs Expenses Chart */}
        <Card className="tributo-card">
          <CardHeader>
            <CardTitle>Income vs Expenses</CardTitle>
            <CardDescription>Overview of your financial health</CardDescription>
          </CardHeader>
          <CardContent>
            <AreaChart
              width={500}
              height={300}
              data={data}
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
          </CardContent>
        </Card>

        {/* Smart Invoicing Status Chart */}
        <Card className="tributo-card">
          <CardHeader>
            <CardTitle>Smart Invoicing Status</CardTitle>
            <CardDescription>Track your invoice status</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={invoiceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="hsl(var(--accent))" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Financial News Blog */}
        <Card className="tributo-card col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Financial News &amp; Knowledge</CardTitle>
            <CardDescription>Stay updated with the latest financial trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ul>
              {financialNews.map((news, index) => (
                <li key={index} className="mb-4">
                  <a href={news.link} className="font-bold text-accent">
                    {news.title}
                  </a>
                  <p className="text-sm">{news.content}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
