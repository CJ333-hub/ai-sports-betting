import { API_URL, API_KEY } from './config';
import * as mockApi from './api-mock';

const isDevelopment = process.env.NODE_ENV === 'development';

export interface ModelTrainingRequest {
  datasetId: string;
  marketType: string;
  predictionGoal: string;
  confidenceThreshold: number;
  features: string[];
}

export interface ModelPrediction {
  event: string;
  market: string;
  modelPrediction: number;
  marketImplied: number;
  confidence: number;
  value: number;
  explanation: string;
}

export async function trainModel(request: ModelTrainingRequest): Promise<{ modelId: string }> {
  if (isDevelopment) {
    return mockApi.trainModel(request);
  }

  const response = await fetch(`${API_URL}/models/train`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Failed to train model');
  }

  return response.json();
}

export async function getPredictions(modelId: string): Promise<ModelPrediction[]> {
  if (isDevelopment) {
    return mockApi.getPredictions(modelId);
  }

  const response = await fetch(`${API_URL}/models/${modelId}/predictions`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get predictions');
  }

  return response.json();
}

export async function uploadDataset(file: File): Promise<{ datasetId: string }> {
  if (isDevelopment) {
    return mockApi.uploadDataset(file);
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_URL}/datasets/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload dataset');
  }

  return response.json();
}

export async function getAvailableDatasets(): Promise<Array<{
  id: string;
  name: string;
  type: 'team_stats' | 'player_props' | 'game_logs';
  sport: 'NBA' | 'NFL' | 'MLB';
  size: number;
  lastUpdated: string;
}>> {
  if (isDevelopment) {
    return mockApi.getAvailableDatasets();
  }

  const response = await fetch(`${API_URL}/datasets`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get datasets');
  }

  return response.json();
}

export async function getModelPerformance(modelId: string): Promise<Array<{
  date: string;
  accuracy: number;
}>> {
  if (isDevelopment) {
    return mockApi.getModelPerformance(modelId);
  }

  const response = await fetch(`${API_URL}/models/${modelId}/performance`, {
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get model performance');
  }

  return response.json();
} 