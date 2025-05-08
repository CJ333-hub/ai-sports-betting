"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, BarChart3, TrendingUp, DollarSign } from 'lucide-react';
import { Line, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency, formatPercentage } from '@/lib/utils';

interface Stats {
  totalBets: number;
  winRate: number;
  roi: number;
  profit: number;
}

interface BetHistory {
  date: string;
  profit: number;
  winRate: number;
}

const sampleStats: Stats = {
  totalBets: 150,
  winRate: 0.58,
  roi: 0.12,
  profit: 1250,
};

const sampleHistory: BetHistory[] = [
  { date: '2024-03-14', profit: 100, winRate: 0.65 },
  { date: '2024-03-15', profit: 250, winRate: 0.68 },
  { date: '2024-03-16', profit: 400, winRate: 0.72 },
  { date: '2024-03-17', profit: 300, winRate: 0.70 },
  { date: '2024-03-18', profit: 600, winRate: 0.75 },
  { date: '2024-03-19', profit: 800, winRate: 0.73 },
  { date: '2024-03-20', profit: 1250, winRate: 0.76 },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>(sampleStats);
  const [history, setHistory] = useState<BetHistory[]>(sampleHistory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600">
          Track your betting performance and analyze trends
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Bets
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBets}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Win Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(stats.winRate)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              ROI
            </CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(stats.roi)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Profit
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.profit)}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Profit History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <Line data={history}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </Line>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Win Rate History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <Line data={history}>
                  <XAxis dataKey="date" />
                  <YAxis domain={[0.5, 0.8]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="winRate"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={false}
                  />
                </Line>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}