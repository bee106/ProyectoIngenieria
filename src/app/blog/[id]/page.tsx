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
import { notFound } from "next/navigation";

const financialNews = [
  {
    id: "navigating-inflation",
    title: "Navigating Inflation: Strategies for Colombian Businesses",
    content:
      "Inflation is impacting businesses globally. Discover specific strategies tailored for Colombian businesses to mitigate its effects.",
    link: "#",
    fullContent: `
      ## Navigating Inflation: Strategies for Colombian Businesses

      Inflation is a global phenomenon affecting businesses of all sizes. For Colombian businesses, understanding and adapting to inflation is crucial for survival and growth.

      ### Understanding Inflation

      Inflation refers to the increase in the prices of goods and services in an economy over a period of time. It erodes purchasing power and can significantly impact business costs and profitability.

      ### Strategies for Colombian Businesses

      1.  **Cost Management:** Implement strict cost control measures to minimize the impact of rising prices.

      2.  **Pricing Strategies:** Adjust pricing strategies to reflect increased costs while remaining competitive.

      3.  **Supply Chain Optimization:** Diversify your supply chain to reduce reliance on single sources and mitigate disruptions.

      4.  **Financial Planning:** Develop robust financial plans that account for inflation and potential economic fluctuations.

      5.  **Investment in Technology:** Embrace digital technologies to improve efficiency and reduce operational costs.

      ### Conclusion

      Navigating inflation requires proactive measures and strategic decision-making. By implementing these strategies, Colombian businesses can mitigate the impact of inflation and position themselves for long-term success.
    `,
  },
  {
    id: "tax-reform-2024",
    title: "Tax Reform 2024: What Colombian Businesses Need to Know",
    content:
      "Stay ahead with the latest changes in Colombian tax law. This article breaks down the key reforms and how they affect your business.",
    link: "#",
    fullContent: `
      ## Tax Reform 2024: What Colombian Businesses Need to Know

      The Colombian government has implemented significant tax reforms in 2024, impacting businesses across various sectors.

      ### Key Reforms

      1.  **Corporate Income Tax:** Changes to the corporate income tax rate and deductions.

      2.  **VAT Adjustments:** Modifications to the Value Added Tax (VAT) rates and exemptions.

      3.  **Tax Incentives:** New tax incentives for investments in specific industries and regions.

      4.  **Digital Economy Taxation:** Regulations for taxing digital services and transactions.

      ### Implications for Businesses

      *   Increased compliance requirements and reporting obligations.
      *   Potential changes to tax liabilities and financial planning.
      *   Opportunities to leverage tax incentives for growth and investment.

      ### Recommendations

      *   Consult with tax advisors to understand the specific implications for your business.
      *   Update your accounting and financial systems to comply with the new regulations.
      *   Explore opportunities to benefit from available tax incentives.

      By staying informed and proactive, Colombian businesses can navigate the tax reform effectively and minimize potential disruptions.
    `,
  },
  {
    id: "digital-transformation",
    title: "Digital Transformation: A Financial Perspective",
    content:
      "Explore how adopting digital technologies can streamline financial operations and improve profitability for Colombian businesses.",
    link: "#",
    fullContent: `
      ## Digital Transformation: A Financial Perspective

      Digital transformation is no longer a choice but a necessity for businesses seeking to thrive in today's economy.

      ### Benefits of Digital Transformation

      *   **Improved Efficiency:** Streamline financial processes and reduce manual tasks.
      *   **Cost Reduction:** Lower operational costs through automation and optimization.
      *   **Enhanced Decision-Making:** Access real-time data and analytics for better insights.
      *   **Increased Profitability:** Drive revenue growth and improve bottom-line performance.

      ### Key Technologies

      *   **Cloud Computing:** Migrate financial systems to the cloud for scalability and flexibility.
      *   **Data Analytics:** Implement data analytics tools to gain insights into financial performance.
      *   **Automation:** Automate repetitive tasks such as invoice processing and reconciliation.

      ### Conclusion

      Embracing digital transformation can provide a significant competitive advantage for Colombian businesses. By investing in the right technologies and strategies, businesses can streamline their financial operations and achieve sustainable growth.
    `,
  },
];

interface Props {
  params: { id: string };
}

export default function BlogPost({ params }: Props) {
  const post = financialNews.find((news) => news.id === params.id);

  if (!post) {
    return notFound();
  }

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
        <Card className="tributo-card">
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-muted-foreground">
              {post.content}
            </CardDescription>
            <div
              className="mt-4 text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: post.fullContent }}
            />
            <Link href="/blog">
              <Button variant="link" className="mt-4">
                Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
