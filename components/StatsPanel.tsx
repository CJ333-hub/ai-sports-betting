"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";

interface StatsPanelProps {
  stats: {
    total_predictions: number;
    accuracy: number;
    win_rate: number;
    average_odds: number;
    roi: number;
  } | null;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  if (!stats) return null;

  const metrics = [
    {
      label: "Total Predictions",
      value: stats.total_predictions,
      format: (val: number) => val.toLocaleString(),
    },
    {
      label: "Accuracy",
      value: stats.accuracy,
      format: (val: number) => `${(val * 100).toFixed(1)}%`,
    },
    {
      label: "Win Rate",
      value: stats.win_rate,
      format: (val: number) => `${(val * 100).toFixed(1)}%`,
    },
    {
      label: "Average Odds",
      value: stats.average_odds,
      format: (val: number) => val.toFixed(2),
    },
    {
      label: "ROI",
      value: stats.roi,
      format: (val: number) => `${(val * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="bg-gray-50">
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">{metric.label}</div>
            <div className="text-2xl font-bold mt-1">
              {metric.format(metric.value)}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
