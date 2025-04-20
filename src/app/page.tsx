"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { classifyInvoiceData } from "@/ai/flows/invoice-data-classification";
import { taxAssistantGuidance } from "@/ai/flows/tax-assistant-guidance";

export default function Home() {
  const [invoiceData, setInvoiceData] = useState<any>(null);
  const [taxGuidance, setTaxGuidance] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Example usage of classifyInvoiceData
      const invoiceDataResult = await classifyInvoiceData({
        invoiceDocumentUrl: "https://picsum.photos/200/300", // Replace with a real URL
      });
      setInvoiceData(invoiceDataResult);

      // Example usage of taxAssistantGuidance
      const taxGuidanceResult = await taxAssistantGuidance({
        question: "How can I reduce my VAT?",
      });
      setTaxGuidance(taxGuidanceResult);
    };

    fetchData();
  }, []);

  return (
    <>
      <Sidebar className="w-64">
        <SidebarHeader>
          <div className="flex items-center space-x-2">
            {Icons.logo && <Icons.logo className="h-6 w-6" />}
            <span className="font-bold">TributoClaro</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <ScrollArea className="h-full">
            <SidebarMenu>
              <SidebarMenuButton>
                <Icons.home className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Icons.users className="mr-2 h-4 w-4" />
                <span>Clients</span>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Icons.fileText className="mr-2 h-4 w-4" />
                <span>Invoices</span>
              </SidebarMenuButton>
              <SidebarMenuButton>
                <Icons.messageCircle className="mr-2 h-4 w-4" />
                <span>AI Tax Assistant</span>
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

      <div className="flex-1 p-4 md:pl-64">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Overview of your financial health</CardDescription>
              </CardHeader>
              <CardContent>
                <Icons.pieChart className="w-6 h-6 mb-2" />
                {/* Add dynamic chart here */}
                <p>Chart data will be displayed here.</p>
              </CardContent>
            </Card>

            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>Smart Invoicing Status</CardTitle>
                <CardDescription>Track your invoice status</CardDescription>
              </CardHeader>
              <CardContent>
                <Icons.barChart className="w-6 h-6 mb-2" />
                {/* Add invoice status chart here */}
                <p>Invoice chart data.</p>
              </CardContent>
            </Card>

            {/* Display AI-classified invoice data */}
            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>AI Invoice Data</CardTitle>
                <CardDescription>Extracted invoice information</CardDescription>
              </CardHeader>
              <CardContent>
                {invoiceData ? (
                  <>
                    <p>Invoice Number: {invoiceData.invoiceNumber}</p>
                    <p>Issue Date: {invoiceData.issueDate}</p>
                    {/* Display other extracted data */}
                  </>
                ) : (
                  <p>Loading invoice data...</p>
                )}
              </CardContent>
            </Card>

            {/* Display AI tax guidance */}
            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>AI Tax Guidance</CardTitle>
                <CardDescription>Get tax advice</CardDescription>
              </CardHeader>
              <CardContent>
                {taxGuidance ? (
                  <p>{taxGuidance.answer}</p>
                ) : (
                  <p>Loading tax guidance...</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Other dashboard content goes here */}
        </div>
      </div>
    </>
  );
}
