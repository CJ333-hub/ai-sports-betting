"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ConfidenceMeterProps {
  confidence: number;
  prediction: number;
  marketImplied: number;
  explanation: string;
}

export default function ConfidenceMeter({
  confidence,
  prediction,
  marketImplied,
  explanation
}: ConfidenceMeterProps) {
  const getConfidenceColor = (value: number) => {
    if (value >= 0.8) return 'bg-green-500';
    if (value >= 0.6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getConfidenceLabel = (value: number) => {
    if (value >= 0.8) return 'High Confidence';
    if (value >= 0.6) return 'Medium Confidence';
    return 'Low Confidence';
  };

  const getValueColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const value = prediction - marketImplied;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Model Confidence</span>
          <span className={cn(
            "text-sm font-medium px-2 py-1 rounded-full",
            getConfidenceColor(confidence)
          )}>
            {getConfidenceLabel(confidence)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Confidence Level</span>
              <span>{(confidence * 100).toFixed(1)}%</span>
            </div>
            <Progress value={confidence * 100} className={getConfidenceColor(confidence)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Model Prediction</div>
              <div className="text-lg font-medium">
                {(prediction * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Market Implied</div>
              <div className="text-lg font-medium">
                {(marketImplied * 100).toFixed(1)}%
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Value</div>
            <div className={cn("text-lg font-medium", getValueColor(value))}>
              {value > 0 ? '+' : ''}{(value * 100).toFixed(1)}%
            </div>
          </div>

          <div className="text-sm text-gray-600">
            {explanation}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 