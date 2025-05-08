"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StatsPanelProps {
  stats: {
    total_predictions: number;
    accuracy: number;
    win_rate: number;
    average_odds: number;
    roi: number;
  };
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  // Mock data for the charts
  const profitData = [
    { date: "Jan", profit: 0 },
    { date: "Feb", profit: 0 },
    { date: "Mar", profit: 0 },
    { date: "Apr", profit: 0 },
    { date: "May", profit: 0 },
  ];

  const winRateData = [
    { date: "Jan", rate: 0 },
    { date: "Feb", rate: 0 },
    { date: "Mar", rate: 0 },
    { date: "Apr", rate: 0 },
    { date: "May", rate: 0 },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Profit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Win Rate History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={winRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="rate"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
