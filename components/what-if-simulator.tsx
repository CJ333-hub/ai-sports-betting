"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, TrendingUp, TrendingDown, Cloud, UserX } from 'lucide-react';

interface SimulationScenario {
  id: string;
  name: string;
  type: 'injury' | 'weather' | 'line_movement';
  impact: number;
  description: string;
}

interface SimulationResult {
  originalPrediction: number;
  adjustedPrediction: number;
  confidence: number;
  explanation: string;
}

export default function WhatIfSimulator() {
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([
    {
      id: '1',
      name: 'Star Player Injury',
      type: 'injury',
      impact: 0.15,
      description: 'Simulate impact of key player being out'
    },
    {
      id: '2',
      name: 'Weather Conditions',
      type: 'weather',
      impact: 0.1,
      description: 'Adjust for weather impact on outdoor sports'
    },
    {
      id: '3',
      name: 'Line Movement',
      type: 'line_movement',
      impact: 0.05,
      description: 'Simulate betting line changes'
    }
  ]);

  const [activeScenarios, setActiveScenarios] = useState<string[]>([]);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);

  const handleScenarioToggle = (scenarioId: string) => {
    setActiveScenarios(prev => 
      prev.includes(scenarioId)
        ? prev.filter(id => id !== scenarioId)
        : [...prev, scenarioId]
    );
  };

  const handleImpactChange = (scenarioId: string, value: number) => {
    setScenarios(prev =>
      prev.map(scenario =>
        scenario.id === scenarioId
          ? { ...scenario, impact: value }
          : scenario
      )
    );
  };

  const runSimulation = () => {
    // Calculate adjusted prediction based on active scenarios
    const totalImpact = activeScenarios.reduce((sum, id) => {
      const scenario = scenarios.find(s => s.id === id);
      return sum + (scenario?.impact || 0);
    }, 0);

    const originalPrediction = 0.65; // Example value
    const adjustedPrediction = Math.max(0, Math.min(1, originalPrediction + totalImpact));
    const confidence = Math.max(0, 1 - Math.abs(totalImpact));

    setSimulationResult({
      originalPrediction,
      adjustedPrediction,
      confidence,
      explanation: generateExplanation(activeScenarios, totalImpact)
    });
  };

  const generateExplanation = (activeIds: string[], totalImpact: number): string => {
    const activeScenarios = scenarios.filter(s => activeIds.includes(s.id));
    return `Simulation accounts for: ${activeScenarios.map(s => s.name).join(', ')}. ` +
           `Total impact: ${(totalImpact * 100).toFixed(1)}% on prediction.`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>What If Simulator</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {scenarios.map(scenario => (
              <div key={scenario.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={activeScenarios.includes(scenario.id)}
                      onCheckedChange={() => handleScenarioToggle(scenario.id)}
                    />
                    <Label>{scenario.name}</Label>
                  </div>
                  <Badge variant="outline">
                    {scenario.type === 'injury' && <UserX className="h-4 w-4 mr-1" />}
                    {scenario.type === 'weather' && <Cloud className="h-4 w-4 mr-1" />}
                    {scenario.type === 'line_movement' && <TrendingUp className="h-4 w-4 mr-1" />}
                    {scenario.type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-4">{scenario.description}</p>
                <div className="space-y-2">
                  <Label>Impact: {(scenario.impact * 100).toFixed(1)}%</Label>
                  <Slider
                    value={[scenario.impact * 100]}
                    onValueChange={([value]) => handleImpactChange(scenario.id, value / 100)}
                    min={0}
                    max={50}
                    step={1}
                  />
                </div>
              </div>
            ))}

            <Button
              className="w-full"
              onClick={runSimulation}
              disabled={activeScenarios.length === 0}
            >
              Run Simulation
            </Button>

            {simulationResult && (
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="font-medium mb-4">Simulation Results</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Original Prediction</div>
                    <div className="text-lg font-medium">
                      {(simulationResult.originalPrediction * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Adjusted Prediction</div>
                    <div className="text-lg font-medium">
                      {(simulationResult.adjustedPrediction * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500">Confidence</div>
                  <div className="text-lg font-medium">
                    {(simulationResult.confidence * 100).toFixed(1)}%
                  </div>
                </div>
                <p className="text-sm text-gray-600">{simulationResult.explanation}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 