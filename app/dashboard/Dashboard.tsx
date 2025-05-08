"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PredictForm from "@/components/PredictForm";
import EVAnalysis from "@/components/EVAnalysis";
import FeedbackForm from "@/components/FeedbackForm";
import StatsPanel from "@/components/StatsPanel";

export default function Dashboard() {
  const [stats] = useState({
    total_predictions: 0,
    accuracy: 0,
    win_rate: 0,
    average_odds: 0,
    roi: 0,
  });

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold">AI Sports Betting Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ev-analysis">+EV Analysis</TabsTrigger>
          <TabsTrigger value="history">Betting History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Total Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total_predictions}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.accuracy}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.win_rate}%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.roi}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Get Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <PredictForm />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Performance Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <StatsPanel stats={stats} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ev-analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">+EV Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <EVAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Submit Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
