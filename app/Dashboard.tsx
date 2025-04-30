
"use client";

import PredictForm from "@/components/PredictForm";
import FeedbackForm from "@/components/FeedbackForm";
import StatsPanel from "@/components/StatsPanel";

export default function Dashboard() {
  return (
    <main className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">🏈 AI Sports Betting Dashboard</h1>
      
      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">1. Predict Winner</h2>
        <PredictForm />
      </section>

      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">2. Submit Feedback</h2>
        <FeedbackForm />
      </section>

      <section className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">3. Model Stats</h2>
        <StatsPanel />
      </section>
    </main>
  );
}
