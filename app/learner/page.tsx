"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Trophy, 
  Brain, 
  TrendingUp, 
  Wallet, 
  Target,
  BarChart3,
  ChevronRight,
  AlertCircle
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  completed: boolean;
  quiz: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
    }>;
  };
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'moneyline' | 'spread' | 'total';
  requirements: {
    minOdds?: number;
    maxOdds?: number;
    minValue?: number;
    count: number;
  };
  reward: number;
  completed: boolean;
}

interface Bet {
  id: string;
  event: string;
  market: string;
  odds: number;
  stake: number;
  result: 'win' | 'loss' | 'pending';
  aiFeedback: string;
  timestamp: string;
}

interface Bankroll {
  balance: number;
  strategy: 'flat' | 'kelly' | 'units';
  unitSize: number;
  history: Array<{
    type: 'bet' | 'challenge' | 'lesson';
    amount: number;
    description: string;
    timestamp: string;
  }>;
}

export default function LearnerPage() {
  const [bankroll, setBankroll] = useState<Bankroll>({
    balance: 1000,
    strategy: 'flat',
    unitSize: 10,
    history: []
  });

  const [lessons] = useState<Lesson[]>([
    {
      id: '1',
      title: 'Understanding Implied Probability',
      description: 'Learn how to convert odds into probabilities and identify value.',
      content: 'Implied probability is the probability of an outcome as suggested by the odds...',
      completed: false,
      quiz: {
        questions: [
          {
            question: 'What is the implied probability of +150 odds?',
            options: ['40%', '60%', '66.7%', '33.3%'],
            correctAnswer: 1
          }
        ]
      }
    },
    {
      id: '2',
      title: 'Over/Under Performance Analysis',
      description: 'Master the art of analyzing totals and identifying trends.',
      content: 'When analyzing over/under markets, consider factors like...',
      completed: false,
      quiz: {
        questions: [
          {
            question: 'Which factor is most important when analyzing totals?',
            options: ['Team colors', 'Weather conditions', 'Player injuries', 'All of the above'],
            correctAnswer: 3
          }
        ]
      }
    },
    {
      id: '3',
      title: 'Bankroll Management Strategies',
      description: 'Learn different approaches to managing your betting bankroll.',
      content: 'The Kelly Criterion suggests betting a percentage of your bankroll...',
      completed: false,
      quiz: {
        questions: [
          {
            question: 'What is the main advantage of the Kelly Criterion?',
            options: ['Simplicity', 'Maximum growth', 'Risk reduction', 'None of the above'],
            correctAnswer: 1
          }
        ]
      }
    }
  ]);

  const [challenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Value Hunter',
      description: 'Find 3 moneyline bets with positive expected value under +150 odds.',
      type: 'moneyline',
      requirements: {
        maxOdds: 150,
        minValue: 0.05,
        count: 3
      },
      reward: 50,
      completed: false
    },
    {
      id: '2',
      title: 'Spread Master',
      description: 'Successfully predict 2 spread bets with at least 60% confidence.',
      type: 'spread',
      requirements: {
        count: 2
      },
      reward: 75,
      completed: false
    }
  ]);

  const [bets, setBets] = useState<Bet[]>([]);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [progress, setProgress] = useState(0);

  const calculateKellyStake = (odds: number, probability: number) => {
    const decimalOdds = odds / 100 + 1;
    const kelly = (probability * decimalOdds - 1) / (decimalOdds - 1);
    return Math.max(0, kelly * bankroll.balance);
  };

  const placeBet = (bet: Omit<Bet, 'id' | 'result' | 'aiFeedback' | 'timestamp'>) => {
    const stake = bankroll.strategy === 'kelly' 
      ? calculateKellyStake(bet.odds, 0.5) // Simplified probability for demo
      : bankroll.strategy === 'units'
        ? bankroll.unitSize
        : bankroll.unitSize;

    const newBet: Bet = {
      ...bet,
      id: Date.now().toString(),
      stake,
      result: 'pending',
      aiFeedback: 'Analyzing historical data and team performance...',
      timestamp: new Date().toISOString()
    };

    setBets([...bets, newBet]);
    setBankroll({
      ...bankroll,
      balance: bankroll.balance - stake,
      history: [...bankroll.history, {
        type: 'bet',
        amount: -stake,
        description: `Placed bet on ${bet.event}`,
        timestamp: new Date().toISOString()
      }]
    });
  };

  const completeLesson = (lessonId: string) => {
    setLessons(lessons.map(lesson => 
      lesson.id === lessonId ? { ...lesson, completed: true } : lesson
    ));
    setBankroll({
      ...bankroll,
      balance: bankroll.balance + 25,
      history: [...bankroll.history, {
        type: 'lesson',
        amount: 25,
        description: `Completed lesson: ${lessons.find(l => l.id === lessonId)?.title}`,
        timestamp: new Date().toISOString()
      }]
    });
  };

  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setBankroll({
        ...bankroll,
        balance: bankroll.balance + challenge.reward,
        history: [...bankroll.history, {
          type: 'challenge',
          amount: challenge.reward,
          description: `Completed challenge: ${challenge.title}`,
          timestamp: new Date().toISOString()
        }]
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bankroll Card */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Wallet className="h-5 w-5" />
              <span>Simulated Bankroll</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-3xl font-bold">${bankroll.balance.toFixed(2)}</div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Strategy</div>
                <select
                  value={bankroll.strategy}
                  onChange={(e) => setBankroll({ ...bankroll, strategy: e.target.value as 'flat' | 'kelly' | 'units' })}
                  className="w-full p-2 border rounded"
                >
                  <option value="flat">Flat Betting</option>
                  <option value="kelly">Kelly Criterion</option>
                  <option value="units">Unit Betting</option>
                </select>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">Unit Size</div>
                <input
                  type="number"
                  value={bankroll.unitSize}
                  onChange={(e) => setBankroll({ ...bankroll, unitSize: Number(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Tabs defaultValue="lessons">
            <TabsList>
              <TabsTrigger value="lessons">
                <BookOpen className="h-4 w-4 mr-2" />
                Lessons
              </TabsTrigger>
              <TabsTrigger value="challenges">
                <Trophy className="h-4 w-4 mr-2" />
                Challenges
              </TabsTrigger>
              <TabsTrigger value="bets">
                <TrendingUp className="h-4 w-4 mr-2" />
                My Bets
              </TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-4">
              {lessons.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{lesson.title}</span>
                      {lesson.completed && (
                        <Badge variant="success">Completed</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{lesson.description}</p>
                    <Button
                      onClick={() => setCurrentLesson(lesson)}
                      disabled={lesson.completed}
                    >
                      {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="challenges" className="space-y-4">
              {challenges.map((challenge) => (
                <Card key={challenge.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{challenge.title}</span>
                      {challenge.completed && (
                        <Badge variant="success">Completed</Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{challenge.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Reward: ${challenge.reward}
                      </div>
                      <Button
                        onClick={() => completeChallenge(challenge.id)}
                        disabled={challenge.completed}
                      >
                        {challenge.completed ? 'Completed' : 'Start Challenge'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="bets" className="space-y-4">
              {bets.map((bet) => (
                <Card key={bet.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{bet.event}</span>
                      <Badge variant={bet.result === 'win' ? 'success' : bet.result === 'loss' ? 'destructive' : 'secondary'}>
                        {bet.result}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Market</span>
                        <span>{bet.market}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Odds</span>
                        <span>{bet.odds}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Stake</span>
                        <span>${bet.stake}</span>
                      </div>
                      <div className="mt-4 p-3 bg-gray-50 rounded">
                        <div className="flex items-start space-x-2">
                          <Brain className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <div className="font-medium text-sm">AI Analysis</div>
                            <p className="text-sm text-gray-600">{bet.aiFeedback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Lesson Modal */}
      {currentLesson && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <CardTitle>{currentLesson.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>{currentLesson.content}</p>
                <div className="space-y-4">
                  {currentLesson.quiz.questions.map((question, index) => (
                    <div key={index} className="space-y-2">
                      <p className="font-medium">{question.question}</p>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <Button
                            key={optionIndex}
                            variant="outline"
                            className="w-full justify-start"
                            onClick={() => {
                              if (optionIndex === question.correctAnswer) {
                                completeLesson(currentLesson.id);
                                setCurrentLesson(null);
                              }
                            }}
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}