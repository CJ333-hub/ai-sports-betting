"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    match: string;
    prediction: string;
    outcome: string;
    notes: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setFeedback({
        match: "Home Team vs Away Team",
        prediction: "Home Team",
        outcome: "Win",
        notes: "Great prediction!",
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="match">Match</Label>
          <Input id="match" placeholder="Enter match details" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="prediction">Prediction</Label>
          <Input id="prediction" placeholder="Enter prediction" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="outcome">Outcome</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select outcome" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="win">Win</SelectItem>
              <SelectItem value="loss">Loss</SelectItem>
              <SelectItem value="push">Push</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="notes">Notes</Label>
          <Input id="notes" placeholder="Enter any additional notes" />
        </div>
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Submitting..." : "Submit Feedback"}
      </Button>

      {feedback && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Feedback Submitted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Match</span>
                <span className="font-medium">{feedback.match}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Prediction</span>
                <span className="font-medium">{feedback.prediction}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Outcome</span>
                <span className="font-medium">{feedback.outcome}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Notes</span>
                <span className="font-medium">{feedback.notes}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
