
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

const headers = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
};

// Predict winner
export async function predictWinner(teamA: string, teamB: string) {
  const res = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers,
    body: JSON.stringify({ team_a: teamA, team_b: teamB }),
  });
  if (!res.ok) throw new Error("Prediction failed");
  return res.json();
}

// Submit feedback
export async function submitFeedback(
  user_id: string,
  teamA: string,
  teamB: string,
  user_choice: string,
  correct: boolean
) {
  const res = await fetch(`${API_URL}/feedback`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      user_id,
      team_a: teamA,
      team_b: teamB,
      user_choice,
      correct,
    }),
  });
  if (!res.ok) throw new Error("Feedback failed");
  return res.json();
}

// Get all predictions
export async function getPredictions() {
  const res = await fetch(`${API_URL}/predictions`, { headers });
  if (!res.ok) throw new Error("Failed to fetch predictions");
  return res.json();
}

// Get all feedback
export async function getFeedback() {
  const res = await fetch(`${API_URL}/feedback`, { headers });
  if (!res.ok) throw new Error("Failed to fetch feedback");
  return res.json();
}

// Get stats
export async function getStats() {
  const res = await fetch(`${API_URL}/stats`);
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}

// Health check
export async function healthCheck() {
  const res = await fetch(`${API_URL}/health`);
  if (!res.ok) throw new Error("API is not healthy");
  return res.json();
}
