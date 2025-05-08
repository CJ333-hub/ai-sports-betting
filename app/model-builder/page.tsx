'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ModelFeature {
  name: string;
  weight: number;
  type: 'numeric' | 'categorical';
}

interface ModelResult {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
}

export default function ModelBuilderPage() {
  const [modelName, setModelName] = useState('');
  const [sport, setSport] = useState('');
  const [features, setFeatures] = useState<ModelFeature[]>([]);
  const [newFeature, setNewFeature] = useState({ name: '', weight: 1, type: 'numeric' });
  const [results, setResults] = useState<ModelResult | null>(null);
  const [training, setTraining] = useState(false);

  const addFeature = () => {
    if (newFeature.name) {
      setFeatures([...features, newFeature]);
      setNewFeature({ name: '', weight: 1, type: 'numeric' });
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const trainModel = async () => {
    setTraining(true);
    // Simulate model training
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate results
    setResults({
      accuracy: 0.78,
      precision: 0.75,
      recall: 0.82,
      f1Score: 0.78
    });
    
    setTraining(false);
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Model Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Model Name</Label>
              <Input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="e.g., NBA Player Props Predictor"
              />
            </div>

            <div className="space-y-2">
              <Label>Sport</Label>
              <Select value={sport} onValueChange={setSport}>
                <SelectTrigger>
                  <SelectValue placeholder="Select sport" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nba">NBA (Basketball)</SelectItem>
                  <SelectItem value="nfl">NFL (Football)</SelectItem>
                  <SelectItem value="mlb">MLB (Baseball)</SelectItem>
                  <SelectItem value="nhl">NHL (Hockey)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Features</Label>
              <div className="space-y-2">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="flex-1">
                      <div className="text-sm font-medium">{feature.name}</div>
                      <div className="text-xs text-gray-500">
                        Weight: {feature.weight} | Type: {feature.type}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    value={newFeature.name}
                    onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                    placeholder="Feature name"
                  />
                  <Select
                    value={newFeature.type}
                    onValueChange={(value) => setNewFeature({ ...newFeature, type: value as 'numeric' | 'categorical' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="numeric">Numeric</SelectItem>
                      <SelectItem value="categorical">Categorical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addFeature} className="w-full">
                  Add Feature
                </Button>
              </div>
            </div>

            <Button
              onClick={trainModel}
              disabled={training || !modelName || !sport || features.length === 0}
              className="w-full"
            >
              {training ? 'Training Model...' : 'Train Model'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
          </CardHeader>
          <CardContent>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Accuracy</div>
                    <div className="text-2xl font-bold">
                      {(results.accuracy * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Precision</div>
                    <div className="text-2xl font-bold">
                      {(results.precision * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Recall</div>
                    <div className="text-2xl font-bold">
                      {(results.recall * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">F1 Score</div>
                    <div className="text-2xl font-bold">
                      {(results.f1Score * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { metric: 'Accuracy', value: results.accuracy * 100 },
                        { metric: 'Precision', value: results.precision * 100 },
                        { metric: 'Recall', value: results.recall * 100 },
                        { metric: 'F1 Score', value: results.f1Score * 100 },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="metric" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#2563eb"
                        name="Score"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Train a model to see performance metrics
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
