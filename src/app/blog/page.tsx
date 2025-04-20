"use client";

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

const financialNews = [
  {
    title: "Navigating Inflation: Strategies for Colombian Businesses",
    content:
      "Inflation is impacting businesses globally. Discover specific strategies tailored for Colombian businesses to mitigate its effects.",
    link: "#",
  },
  {
    title: "Tax Reform 2024: What Colombian Businesses Need to Know",
    content:
      "Stay ahead with the latest changes in Colombian tax law. This article breaks down the key reforms and how they affect your business.",
    link: "#",
  },
  {
    title: "Digital Transformation: A Financial Perspective",
    content:
      "Explore how adopting digital technologies can streamline financial operations and improve profitability for Colombian businesses.",
    link: "#",
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-secondary p-4 border-b border-border">
        <div className="container mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.home className="h-5 w-5" />
            <span className="font-bold">Dashboard</span>
          </Link>
        </div>
      </nav>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">
          Financial News &amp; Knowledge Blog
        </h1>
        <p className="text-muted-foreground mb-4">
          Stay updated with the latest financial trends and insights relevant to
          Colombian businesses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {financialNews.map((news, index) => (
            <Card key={index} className="tributo-card">
              <CardHeader>
                <CardTitle>{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  {news.content}
                </CardDescription>
                <Link href={news.link}>
                  <Button variant="link" className="mt-2">
                    Read More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
