
"use client";

import { useEffect, useState } from "react";
import { getStats } from "@/lib/api";

export default function StatsPanel() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getStats();
        setStats(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load stats");
      }
    }
    loadStats();
  }, []);

  if (error) return <p>{error}</p>;

  return stats ? (
    <div>
      <h2>📊 Stats</h2>
      <p>Total Predictions: {stats.total_predictions}</p>
      <p>Feedback Received: {stats.feedback_received}</p>
      <p>Accuracy: {stats.accuracy !== null ? stats.accuracy * 100 + "%" : "N/A"}</p>
    </div>
  ) : (
    <p>Loading stats...</p>
  );
}
