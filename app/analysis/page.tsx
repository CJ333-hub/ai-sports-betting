"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BettingDiary from "@/components/betting-diary";
import AIFeedbackLoop from "@/components/ai-feedback-loop";

export default function AnalysisPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Analysis & Insights</h1>
      
      <Tabs defaultValue="diary" className="space-y-6">
        <TabsList>
          <TabsTrigger value="diary">Betting Diary</TabsTrigger>
          <TabsTrigger value="feedback">AI Feedback Loop</TabsTrigger>
        </TabsList>
        
        <TabsContent value="diary" className="space-y-6">
          <div className="grid gap-6">
            <BettingDiary />
          </div>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6">
            <AIFeedbackLoop />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 