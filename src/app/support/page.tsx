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
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Icons } from "@/components/icons";

const SupportPage = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Simulate fetching support data from an API
    // In a real application, this would be an API call
    // For demonstration purposes, we're using dummy data
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
    };

    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitted message: ${message}`);
    setMessage("");
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
        <h1 className="text-3xl font-bold mb-6">Support Module</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>Send us a message</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your message here"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                <Button>Send Message</Button>
              </form>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>Knowledge Base</CardTitle>
              <CardDescription>Find answers to common questions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                <li className="py-2">
                  <Link href="#">How to create an invoice</Link>
                </li>
                <li className="py-2">
                  <Link href="#">How to manage clients</Link>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>Frequently Asked Questions</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-none pl-0">
                <li className="py-2">
                  <Link href="#">What is VAT?</Link>
                </li>
                <li className="py-2">
                  <Link href="#">How do I calculate my taxes?</Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const Label = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export default SupportPage;
