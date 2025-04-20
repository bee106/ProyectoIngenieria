"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarTrigger } from "@/components/ui/sidebar";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

export default function Home() {
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
                  <Icons.Blog className="mr-2 h-4 w-4" />
                  <span>Blog</span>
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
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <SidebarTrigger />
        </div>

        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Financial Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>Welcome to FISCO!</CardTitle>
                <CardDescription>Your financial journey starts here.</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Explore the dashboard, manage clients, create invoices, and get help from the AI Tax Assistant. Let's get your finances in order!</p>
              </CardContent>
            </Card>

            <Card className="tributo-card">
              <CardHeader>
                <CardTitle>Getting Started with FISCO</CardTitle>
                <CardDescription>A quick guide to using the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol>
                  <li>Go to the Dashboard for a financial overview.</li>
                  <li>Add and manage your Clients efficiently.</li>
                  <li>Create and send professional Invoices.</li>
                  <li>Utilize the AI Tax Assistant for expert guidance.</li>
                </ol>
              </CardContent>
            </Card>
          </div>
          {/* Other dashboard content goes here */}
        </div>
      </div>
    </div>
  );
}
