"use client";

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload,
  LineChart,
  BarChart3,
  Target,
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  trainModel, 
  getPredictions, 
  uploadDataset, 
  getAvailableDatasets,
  getModelPerformance,
  type ModelPrediction
} from '@/lib/model';
import { 
  SUPPORTED_MARKET_TYPES, 
  SUPPORTED_PREDICTION_GOALS,
  SUPPORTED_FILE_TYPES,
  MAX_FILE_SIZE
} from '@/lib/config';
import { toast } from 'sonner';

interface Dataset {
  id: string;
  name: string;
  type: 'team_stats' | 'player_props' | 'game_logs';
  sport: 'NBA' | 'NFL' | 'MLB';
  size: number;
  lastUpdated: string;
}

interface ModelConfig {
  marketType: typeof SUPPORTED_MARKET_TYPES[number];
  predictionGoal: typeof SUPPORTED_PREDICTION_GOALS[number];
  confidenceThreshold: number;
  features: string[];
}

export default function ModelBuilder() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);
  const [modelConfig, setModelConfig] = useState<ModelConfig>({
    marketType: 'moneyline',
    predictionGoal: 'win_percentage',
    confidenceThreshold: 0.7,
    features: []
  });
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [predictions, setPredictions] = useState<ModelPrediction[]>([]);
  const [performanceData, setPerformanceData] = useState<Array<{ date: string; accuracy: number }>>([]);
  const [modelId, setModelId] = useState<string | null>(null);

  useEffect(() => {
    loadDatasets();
  }, []);

  const loadDatasets = async () => {
    try {
      const availableDatasets = await getAvailableDatasets();
      setDatasets(availableDatasets);
    } catch (error) {
      toast.error('Failed to load datasets');
      console.error(error);
    }
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 10MB limit');
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (!SUPPORTED_FILE_TYPES.includes(`.${fileExtension}`)) {
      toast.error('Unsupported file type. Please upload CSV or JSON files.');
      return;
    }

    try {
      const { datasetId } = await uploadDataset(file);
      toast.success('Dataset uploaded successfully');
      await loadDatasets();
    } catch (error) {
      toast.error('Failed to upload dataset');
      console.error(error);
    }
  }, []);

  const handleDatasetSelect = (datasetId: string) => {
    const dataset = datasets.find(d => d.id === datasetId);
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

  const trainModelHandler = async () => {
    if (!selectedDataset) return;

    setIsTraining(true);
    setTrainingProgress(0);

    try {
      const { modelId: newModelId } = await trainModel({
        datasetId: selectedDataset.id,
        marketType: modelConfig.marketType,
        predictionGoal: modelConfig.predictionGoal,
        confidenceThreshold: modelConfig.confidenceThreshold,
        features: modelConfig.features
      });

      setModelId(newModelId);
      toast.success('Model trained successfully');

      // Load predictions and performance data
      const [newPredictions, newPerformanceData] = await Promise.all([
        getPredictions(newModelId),
        getModelPerformance(newModelId)
      ]);

      setPredictions(newPredictions);
      setPerformanceData(newPerformanceData);
    } catch (error) {
      toast.error('Failed to train model');
      console.error(error);
    } finally {
      setIsTraining(false);
      setTrainingProgress(100);
    }
  };

  return (
    <div className="space-y-6">
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
                    {datasets.map(dataset => (
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
                  accept={SUPPORTED_FILE_TYPES.join(',')}
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
      <Card>
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
                  {SUPPORTED_MARKET_TYPES.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
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
                  {SUPPORTED_PREDICTION_GOALS.map(goal => (
                    <SelectItem key={goal} value={goal}>
                      {goal.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </SelectItem>
                  ))}
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
            onClick={trainModelHandler}
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
      {performanceData.length > 0 && (
        <Card>
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
      )}

      {/* Predictions */}
      {predictions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Current Predictions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="border rounded-lg p-4">
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
      )}
    </div>
  );
} 