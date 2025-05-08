"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Upload, LineChart, BarChart3, Target, Brain, TrendingUp, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Dataset {
  id: string;
  name: string;
  type: 'team_stats' | 'player_props' | 'game_logs';
  sport: 'NBA' | 'NFL' | 'MLB';
  size: number;
  lastUpdated: string;
}

interface ModelConfig {
  marketType: 'moneyline' | 'spread' | 'total' | 'player_props';
  predictionGoal: 'win_percentage' | 'over_under' | 'expected_points' | 'player_stats';
  confidenceThreshold: number;
  features: string[];
}

interface Prediction {
  id: string;
  event: string;
  market: string;
  modelPrediction: number;
  marketImplied: number;
  confidence: number;
  value: number;
  explanation: string;
  timestamp: string;
}

const sampleDatasets: Dataset[] = [
  {
    id: '1',
    name: 'NBA Team Stats 2023-24',
    type: 'team_stats',
    sport: 'NBA',
    size: 1500,
    lastUpdated: '2024-03-20'
  },
  {
    id: '2',
    name: 'NBA Player Props 2023-24',
    type: 'player_props',
    sport: 'NBA',
    size: 3000,
    lastUpdated: '2024-03-20'
  },
  {
    id: '3',
    name: 'NBA Game Logs 2023-24',
    type: 'game_logs',
    sport: 'NBA',
    size: 5000,
    lastUpdated: '2024-03-20'
  }
];

const samplePredictions: Prediction[] = [
  {
    id: '1',
    event: 'LAL vs GSW',
    market: 'Moneyline',
    modelPrediction: 0.58,
    marketImplied: 0.51,
    confidence: 0.85,
    value: 0.07,
    explanation: 'Lakers have strong matchup advantages in paint scoring and transition defense',
    timestamp: '2024-03-20T15:00:00Z'
  },
  {
    id: '2',
    event: 'BOS vs PHI',
    market: 'Total Points',
    modelPrediction: 0.65,
    marketImplied: 0.50,
    confidence: 0.78,
    value: 0.15,
    explanation: 'Both teams playing at elevated pace with strong offensive ratings',
    timestamp: '2024-03-20T15:00:00Z'
  }
];

const performanceData = [
  { date: '2024-03-14', accuracy: 0.65 },
  { date: '2024-03-15', accuracy: 0.68 },
  { date: '2024-03-16', accuracy: 0.72 },
  { date: '2024-03-17', accuracy: 0.70 },
  { date: '2024-03-18', accuracy: 0.75 },
  { date: '2024-03-19', accuracy: 0.73 },
  { date: '2024-03-20', accuracy: 0.76 }
];

export default function ModelBuilder() {
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    marketType: 'moneyline',
    predictionGoal: 'win_percentage',
    confidenceThreshold: 0.7,
    features: []
  });
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [predictions, setPredictions] = useState<Prediction[]>(samplePredictions);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  const handleDatasetSelect = (datasetId: string) => {
    const dataset = sampleDatasets.find(d => d.id === datasetId);
    if (dataset) {
      setSelectedDataset(dataset);
    }
  };

  const handleConfigChange = (key: keyof ModelConfig, value: any) => {
    setModelConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const trainModel = async () => {
    setIsTraining(true);
    setTrainingProgress(0);

    // Simulate model training
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setTrainingProgress(i);
    }

    setIsTraining(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Model Builder</h1>
        <p className="text-gray-600">
          Create and train custom betting models using historical data
        </p>
      </div>

      {/* Dataset Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Dataset Selection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Choose Dataset</Label>
                <Select onValueChange={handleDatasetSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a dataset" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleDatasets.map(dataset => (
                      <SelectItem key={dataset.id} value={dataset.id}>
                        {dataset.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Upload Custom Dataset</Label>
                <Input
                  type="file"
                  accept=".csv,.json"
                  onChange={handleFileUpload}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {selectedDataset && (
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>Size: {selectedDataset.size} records</span>
                <span>•</span>
                <span>Last updated: {selectedDataset.lastUpdated}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Model Configuration */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>Model Configuration</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Market Type</Label>
              <Select
                value={modelConfig.marketType}
                onValueChange={(value) => handleConfigChange('marketType', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="moneyline">Moneyline</SelectItem>
                  <SelectItem value="spread">Spread</SelectItem>
                  <SelectItem value="total">Total</SelectItem>
                  <SelectItem value="player_props">Player Props</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Prediction Goal</Label>
              <Select
                value={modelConfig.predictionGoal}
                onValueChange={(value) => handleConfigChange('predictionGoal', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="win_percentage">Win Percentage</SelectItem>
                  <SelectItem value="over_under">Over/Under Hit Rate</SelectItem>
                  <SelectItem value="expected_points">Expected Points</SelectItem>
                  <SelectItem value="player_stats">Player Statistics</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Label>Confidence Threshold</Label>
            <Input
              type="number"
              min="0"
              max="1"
              step="0.1"
              value={modelConfig.confidenceThreshold}
              onChange={(e) => handleConfigChange('confidenceThreshold', parseFloat(e.target.value))}
            />
          </div>
          <Button
            className="mt-4 w-full"
            onClick={trainModel}
            disabled={!selectedDataset || isTraining}
          >
            {isTraining ? 'Training Model...' : 'Train Model'}
          </Button>
          {isTraining && (
            <Progress value={trainingProgress} className="mt-2" />
          )}
        </CardContent>
      </Card>

      {/* Model Performance */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LineChart className="h-5 w-5" />
            <span>Model Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <Line data={performanceData}>
                <XAxis dataKey="date" />
                <YAxis domain={[0, 1]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={false}
                />
              </Line>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Predictions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Current Predictions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map(prediction => (
              <div key={prediction.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{prediction.event}</div>
                  <Badge variant={prediction.value > 0 ? 'default' : 'destructive'}>
                    {prediction.market}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="text-sm text-gray-500">Model Prediction</div>
                    <div className="font-medium">{(prediction.modelPrediction * 100).toFixed(1)}%</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Market Implied</div>
                    <div className="font-medium">{(prediction.marketImplied * 100).toFixed(1)}%</div>
                  </div>
                </div>
                <div className="flex items-start space-x-2 mt-2">
                  <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">AI Analysis</div>
                    <p className="text-sm text-gray-600">{prediction.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
