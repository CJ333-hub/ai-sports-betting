"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateImpliedProbability, calculateExpectedValue, formatPercentage } from "@/lib/utils";

export default function EVAnalysis() {
  const [analysis, setAnalysis] = useState<{
    marketOdds: number;
    modelProbability: number;
    impliedProbability: number;
    expectedValue: number;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const marketOdds = parseFloat(form.marketOdds.value);
    const modelProbability = parseFloat(form.modelProbability.value) / 100;

    const impliedProbability = calculateImpliedProbability(marketOdds);
    const expectedValue = calculateExpectedValue(modelProbability, marketOdds);

    setAnalysis({
      marketOdds,
      modelProbability,
      impliedProbability,
      expectedValue,
    });
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="marketOdds">Market Odds (American)</Label>
            <Input
              id="marketOdds"
              name="marketOdds"
              type="number"
              placeholder="e.g., -110 or +150"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="modelProbability">Model Probability (%)</Label>
            <Input
              id="modelProbability"
              name="modelProbability"
              type="number"
              placeholder="e.g., 55.5"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Analyze
        </Button>
      </form>

      {analysis && (
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Market Odds</span>
                  <span className="font-medium">{analysis.marketOdds}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Implied Probability</span>
                  <span className="font-medium">{formatPercentage(analysis.impliedProbability)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Model Probability</span>
                  <span className="font-medium">{formatPercentage(analysis.modelProbability)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Expected Value</span>
                  <span className={`font-medium ${analysis.expectedValue > 0 ? "text-green-500" : "text-red-500"}`}>
                    {formatPercentage(analysis.expectedValue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 