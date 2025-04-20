"use client";

import { useState } from 'react';
import { taxAssistantGuidance } from '@/ai/flows/tax-assistant-guidance';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AIAssistantPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">AI Tax Assistant</h1>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Ask a Tax Question</CardTitle>
          <CardDescription>Get instant AI-powered tax advice.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <Textarea
              placeholder="Enter your tax question here..."
              value={question}
              onChange={handleQuestionChange}
              rows={4}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Get Answer"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {answer && (
        <Card className="w-full max-w-2xl mt-6">
          <CardHeader>
            <CardTitle>AI Tax Assistant Response</CardTitle>
            <CardDescription>Here's what the AI has to say.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{answer}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
