
"use client";

import { useState } from "react";
import { predictWinner } from "@/lib/api";

export default function PredictForm() {
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [winner, setWinner] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!teamA || !teamB) {
      setError("Please enter both team names.");
      return;
    }

    try {
      const res = await predictWinner(teamA, teamB);
      if (res?.winner) {
        setWinner(res.winner);
        setError(null);
      } else {
        setError("No winner returned.");
      }
    } catch (err: any) {
      console.error("Prediction error:", err);
      setError("Prediction failed. Please try again.");
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Team A"
        value={teamA}
        onChange={(e) => setTeamA(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        placeholder="Team B"
        value={teamB}
        onChange={(e) => setTeamB(e.target.value)}
        className="border p-2 rounded w-full"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Predict
      </button>
      {winner && <p className="text-green-600">🔮 Predicted Winner: <strong>{winner}</strong></p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
