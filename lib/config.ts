const isDevelopment = process.env.NODE_ENV === 'development';

export const API_URL = isDevelopment 
  ? 'http://localhost:3000/api'
  : process.env.NEXT_PUBLIC_API_URL || 'https://api.betsmart.ai';

export const API_KEY = isDevelopment
  ? 'dev-api-key'
  : process.env.NEXT_PUBLIC_API_KEY || '';

// Model configuration
export const DEFAULT_CONFIDENCE_THRESHOLD = 0.7;
export const SUPPORTED_MARKET_TYPES = ['moneyline', 'spread', 'total', 'player_props'] as const;
export const SUPPORTED_PREDICTION_GOALS = ['win_percentage', 'over_under', 'expected_points', 'player_stats'] as const;

// Dataset configuration
export const SUPPORTED_DATASET_TYPES = ['team_stats', 'player_props', 'game_logs'] as const;
export const SUPPORTED_SPORTS = ['NBA', 'NFL', 'MLB'] as const;
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const SUPPORTED_FILE_TYPES = ['.csv', '.json']; 