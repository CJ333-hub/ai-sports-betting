import { ModelPrediction } from './model';

// Mock datasets
const mockDatasets = [
  {
    id: '1',
    name: 'NBA Team Stats 2023-24',
    type: 'team_stats' as const,
    sport: 'NBA' as const,
    size: 1500,
    lastUpdated: '2024-03-20'
  },
  {
    id: '2',
    name: 'NBA Player Props 2023-24',
    type: 'player_props' as const,
    sport: 'NBA' as const,
    size: 3000,
    lastUpdated: '2024-03-20'
  },
  {
    id: '3',
    name: 'NBA Game Logs 2023-24',
    type: 'game_logs' as const,
    sport: 'NBA' as const,
    size: 5000,
    lastUpdated: '2024-03-20'
  }
];

// Mock predictions
const mockPredictions: ModelPrediction[] = [
  {
    event: 'LAL vs GSW',
    market: 'Moneyline',
    modelPrediction: 0.58,
    marketImplied: 0.51,
    confidence: 0.85,
    value: 0.07,
    explanation: 'Lakers have strong matchup advantages in paint scoring and transition defense'
  },
  {
    event: 'BOS vs PHI',
    market: 'Total Points',
    modelPrediction: 0.65,
    marketImplied: 0.50,
    confidence: 0.78,
    value: 0.15,
    explanation: 'Both teams playing at elevated pace with strong offensive ratings'
  }
];

// Mock performance data
const mockPerformanceData = [
  { date: '2024-03-14', accuracy: 0.65 },
  { date: '2024-03-15', accuracy: 0.68 },
  { date: '2024-03-16', accuracy: 0.72 },
  { date: '2024-03-17', accuracy: 0.70 },
  { date: '2024-03-18', accuracy: 0.75 },
  { date: '2024-03-19', accuracy: 0.73 },
  { date: '2024-03-20', accuracy: 0.76 }
];

// Mock API functions
export async function getAvailableDatasets() {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  return mockDatasets;
}

export async function uploadDataset(file: File) {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate upload
  return { datasetId: '4' };
}

export async function trainModel(request: any) {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate training
  return { modelId: 'model-1' };
}

export async function getPredictions(modelId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPredictions;
}

export async function getModelPerformance(modelId: string) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockPerformanceData;
} 