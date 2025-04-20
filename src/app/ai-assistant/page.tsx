"use client";

import { useState, useRef, useEffect } from 'react';
import { taxAssistantGuidance } from '@/ai/flows/tax-assistant-guidance';
import { classifyInvoiceData } from '@/ai/flows/invoice-data-classification';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AIAssistantPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading, setInvoiceData] = useState(false);
  const [invoiceAnalysis, setInvoiceAnalysis] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await taxAssistantGuidance({ question: question });
      setAnswer(result.answer);
    } catch (error) {
      console.error("Error getting tax guidance:", error);
      setAnswer("Error fetching answer. Please try again.");
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to get answer. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setSelectedFile(file || null);
  };

  const handleUploadInvoice = async () => {
    if (!selectedFile) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Please select an invoice file.',
      });
      return;
    }

    setLoading(true);
    try {
      // Assuming you have a way to convert the file to a URL or base64 string
      const invoiceDocumentUrl = await toBase64(selectedFile);

      const result = await classifyInvoiceData({ invoiceDocumentUrl });
      setInvoiceAnalysis(JSON.stringify(result, null, 2)); // Pretty print the JSON
      toast({
        title: 'Invoice Analyzed',
        description: 'Invoice data successfully processed.',
      });
    } catch (error) {
      console.error("Error classifying invoice data:", error);
      setInvoiceAnalysis("Error analyzing invoice. Please try again.");
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to analyze invoice. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-background py-10">
      {/* Navigation Bar */}
      <nav className="bg-secondary p-4 border-b border-border w-full">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.home className="h-5 w-5" />
            <span className="font-bold">Dashboard</span>
          </Link>
          <span className="font-semibold text-lg">FISCO</span>
        </div>
      </nav>

      <div className="container max-w-3xl p-6">
        <Card className="shadow-md rounded-lg overflow-hidden">
          <CardHeader className="py-4 px-6">
            <CardTitle className="text-2xl font-semibold text-center">AI Tax Assistant</CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              Upload invoices, ask tax questions, and get instant AI-powered advice.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            {/* Invoice Upload Section */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Analyze Invoice</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Upload an invoice to automatically extract and analyze its data.
              </p>
              <div className="flex items-center space-x-4">
                <input
                  type="file"
                  id="invoice-upload"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                <Button
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Select Invoice
                </Button>
                <Button onClick={handleUploadInvoice} disabled={loading}>
                  {loading ? (
                    <>
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze"
                  )}
                </Button>
                {selectedFile && (
                  <span className="text-sm text-muted-foreground">
                    Selected: {selectedFile.name}
                  </span>
                )}
              </div>
              {invoiceAnalysis && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold mb-2">Invoice Analysis:</h4>
                  <pre className="whitespace-pre-wrap bg-secondary rounded-md p-4 font-mono text-sm">
                    {invoiceAnalysis}
                  </pre>
                </div>
              )}
            </div>

            {/* Tax Question Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Ask a Tax Question</h3>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <Textarea
                  placeholder="Enter your tax question here..."
                  value={question}
                  onChange={handleQuestionChange}
                  rows={4}
                />
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                      Getting Answer...
                    </>
                  ) : (
                    "Get Answer"
                  )}
                </Button>
              </form>
            </div>

            {/* AI Assistant Response */}
            {answer && (
              <div className="mt-6">
                <h4 className="text-md font-semibold mb-2">AI Tax Assistant Response:</h4>
                <Card className="bg-secondary rounded-md">
                  <CardContent>
                    <p>{answer}</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
