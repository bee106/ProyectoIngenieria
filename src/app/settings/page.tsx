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
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/icons";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const [companyData, setCompanyData] = useState({
    name: "Your Company Name",
    nit: "123456789",
    taxRegime: "Simplified",
  });
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    // Simulate fetching company data from an API
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setCompanyData({
        name: "Your Company Name",
        nit: "123456789",
        taxRegime: "Simplified",
      });
    };

    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

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
        <h1 className="text-3xl font-bold mb-6">Settings Module</h1>

        <Tabs defaultValue="company" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="company">Company Data</TabsTrigger>
            <TabsTrigger value="users">Users &amp; Roles</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>
          <TabsContent value="company">
            <Card className="shadow-md rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Manage your company details</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="nit">NIT</Label>
                  <Input
                    id="nit"
                    name="nit"
                    value={companyData.nit}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="taxRegime">Tax Regime</Label>
                  <Input
                    id="taxRegime"
                    name="taxRegime"
                    value={companyData.taxRegime}
                    onChange={handleInputChange}
                  />
                </div>
                <Button>Update Company Data</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="users">
            <Card className="shadow-md rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Users and Roles</CardTitle>
                <CardDescription>Manage users and their roles</CardDescription>
              </CardHeader>
              <CardContent>
                <p>User management content here</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="preferences">
            <Card className="shadow-md rounded-lg overflow-hidden">
              <CardHeader>
                <CardTitle>Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Switch id="theme" checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
