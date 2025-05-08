"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PredictForm() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<{
    team: string;
    probability: number;
    odds: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setPrediction({
        team: "Home Team",
        probability: 0.65,
        odds: 1.85,
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="home-team">Home Team</Label>
          <Input id="home-team" placeholder="Enter home team" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="away-team">Away Team</Label>
          <Input id="away-team" placeholder="Enter away team" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="market">Market</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="match-odds">Match Odds</SelectItem>
              <SelectItem value="over-under">Over/Under</SelectItem>
              <SelectItem value="both-teams-to-score">Both Teams to Score</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Predicting..." : "Get Prediction"}
      </Button>

      {prediction && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Prediction Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Team</span>
                <span className="font-medium">{prediction.team}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Probability</span>
                <span className="font-medium">{(prediction.probability * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Odds</span>
                <span className="font-medium">{prediction.odds.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
