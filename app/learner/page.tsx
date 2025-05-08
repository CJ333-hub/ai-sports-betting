"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { School, Brain, Target, TrendingUp, DollarSign, CheckCircle2 } from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  progress: number;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
  deadline: string;
}

interface Bankroll {
  balance: number;
  startingBalance: number;
  totalBets: number;
  winRate: number;
  roi: number;
}

const lessons: Lesson[] = [
  {
    id: '1',
    title: 'Understanding Odds and Probability',
    description: 'Learn how to convert between different odds formats and calculate implied probability.',
    duration: '30 mins',
    difficulty: 'Beginner',
    completed: true,
    progress: 100,
  },
  {
    id: '2',
    title: 'Bankroll Management',
    description: 'Master the principles of effective bankroll management and risk control.',
    duration: '45 mins',
    difficulty: 'Beginner',
    completed: false,
    progress: 60,
  },
  {
    id: '3',
    title: 'Value Betting',
    description: 'Learn how to identify and capitalize on positive expected value opportunities.',
    duration: '1 hour',
    difficulty: 'Intermediate',
    completed: false,
    progress: 30,
  },
  {
    id: '4',
    title: 'Advanced Statistical Analysis',
    description: 'Deep dive into statistical methods for sports betting analysis.',
    duration: '1.5 hours',
    difficulty: 'Advanced',
    completed: false,
    progress: 0,
  },
];

const challenges: Challenge[] = [
  {
    id: '1',
    title: 'Moneyline Master',
    description: 'Place 3 moneyline bets with positive expected value.',
    reward: 100,
    completed: false,
    deadline: '2024-03-25',
  },
  {
    id: '2',
    title: 'Bankroll Builder',
    description: 'Achieve a 10% ROI over 10 simulated bets.',
    reward: 250,
    completed: true,
    deadline: '2024-03-24',
  },
  {
    id: '3',
    title: 'Value Hunter',
    description: 'Find 5 bets with at least 5% edge according to our model.',
    reward: 500,
    completed: false,
    deadline: '2024-03-26',
  },
];

const initialBankroll: Bankroll = {
  balance: 1250,
  startingBalance: 1000,
  totalBets: 25,
  winRate: 0.60,
  roi: 0.25,
};

export default function LearnerPage() {
  const [bankroll, setBankroll] = useState<Bankroll>(initialBankroll);
  const [activeLessons, setActiveLessons] = useState<Lesson[]>(lessons);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(challenges);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Learner Mode</h1>
        <p className="text-gray-600">
          Master sports betting through interactive lessons and challenges
        </p>
      </div>

      {/* Simulated Bankroll */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5" />
            <span>Simulated Bankroll</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <div className="text-sm text-gray-500">Balance</div>
              <div className="text-2xl font-bold">{formatCurrency(bankroll.balance)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Starting Balance</div>
              <div className="text-2xl font-bold">{formatCurrency(bankroll.startingBalance)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Bets</div>
              <div className="text-2xl font-bold">{bankroll.totalBets}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Win Rate</div>
              <div className="text-2xl font-bold">{formatPercentage(bankroll.winRate)}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">ROI</div>
              <div className="text-2xl font-bold">{formatPercentage(bankroll.roi)}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <School className="h-5 w-5" />
              <span>Lessons</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeLessons.map(lesson => (
                <div key={lesson.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{lesson.title}</div>
                    <Badge variant={lesson.completed ? 'default' : 'secondary'}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span>{lesson.duration}</span>
                    <span>{lesson.progress}% Complete</span>
                  </div>
                  <Progress value={lesson.progress} className="mb-2" />
                  <Button
                    variant={lesson.completed ? 'secondary' : 'default'}
                    className="w-full"
                    disabled={lesson.completed}
                  >
                    {lesson.completed ? 'Completed' : 'Continue'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Challenges */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Daily Challenges</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeChallenges.map(challenge => (
                <div key={challenge.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{challenge.title}</div>
                    <Badge variant={challenge.completed ? 'default' : 'secondary'}>
                      {formatCurrency(challenge.reward)}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Deadline: {new Date(challenge.deadline).toLocaleDateString()}
                    </span>
                    {challenge.completed ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        <span className="text-sm">Completed</span>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm">
                        Start Challenge
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}