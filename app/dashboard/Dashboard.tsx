"use client";

import PredictForm from "@/components/PredictForm";
import FeedbackForm from "@/components/FeedbackForm";
import StatsPanel from "@/components/StatsPanel";

export default function Dashboard() {
  const stats = {
    total_predictions: 0,
    accuracy: 0,
    win_rate: 0,
    average_odds: 0,
    roi: 0
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6">
        <StatsPanel stats={stats} />
        <PredictForm />
        <FeedbackForm />
      </div>
    </div>
  );
}
