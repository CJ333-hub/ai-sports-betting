
"use client";

import { useState } from "react";
import { submitFeedback } from "@/lib/api";

export default function FeedbackForm() {
  const [userId, setUserId] = useState("user_123");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [correct, setCorrect] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await submitFeedback(userId, teamA, teamB, userChoice, correct);
      setMessage("✅ Feedback submitted successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to submit feedback.");
    }
  };

  return (
    <div>
      <h2>Send Feedback</h2>
      <input placeholder="User ID" value={userId} onChange={e => setUserId(e.target.value)} />
      <input placeholder="Team A" value={teamA} onChange={e => setTeamA(e.target.value)} />
      <input placeholder="Team B" value={teamB} onChange={e => setTeamB(e.target.value)} />
      <input placeholder="Your Pick" value={userChoice} onChange={e => setUserChoice(e.target.value)} />
      <label>
        Correct Prediction?
        <input type="checkbox" checked={correct} onChange={e => setCorrect(e.target.checked)} />
      </label>
      <button onClick={handleSubmit}>Submit Feedback</button>
      <p>{message}</p>
    </div>
  );
}
