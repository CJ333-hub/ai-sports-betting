'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface SimulationResult {
  day: number;
  balance: number;
  bets: number;
  wins: number;
}

export default function SimulatorPage() {
  const [initialBalance, setInitialBalance] = useState(1000);
  const [betSize, setBetSize] = useState(50);
  const [winRate, setWinRate] = useState(55);
  const [odds, setOdds] = useState(2.0);
  const [simulationDays, setSimulationDays] = useState(30);
  const [results, setResults] = useState<SimulationResult[]>([]);
  const [running, setRunning] = useState(false);

  const runSimulation = () => {
    setRunning(true);
    const newResults: SimulationResult[] = [];
    let balance = initialBalance;
    let totalBets = 0;
    let totalWins = 0;

    for (let day = 1; day <= simulationDays; day++) {
      // Simulate 5 bets per day
      for (let i = 0; i < 5; i++) {
        if (balance >= betSize) {
          totalBets++;
          const win = Math.random() * 100 < winRate;
          if (win) {
            balance += betSize * (odds - 1);
            totalWins++;
          } else {
            balance -= betSize;
          }
        }
      }

      newResults.push({
        day,
        balance,
        bets: totalBets,
        wins: totalWins,
      });
    }

    setResults(newResults);
    setRunning(false);
  };

  const calculateROI = () => {
    if (results.length === 0) return 0;
    const finalBalance = results[results.length - 1].balance;
    return ((finalBalance - initialBalance) / initialBalance) * 100;
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <h1 className="text-3xl font-bold">Betting Simulator</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Parameters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Initial Balance ($)</Label>
              <Input
                type="number"
                value={initialBalance}
                onChange={(e) => setInitialBalance(Number(e.target.value))}
                min={100}
                max={10000}
              />
            </div>

            <div className="space-y-2">
              <Label>Bet Size ($)</Label>
              <Input
                type="number"
                value={betSize}
                onChange={(e) => setBetSize(Number(e.target.value))}
                min={10}
                max={initialBalance}
              />
            </div>

            <div className="space-y-2">
              <Label>Win Rate (%)</Label>
              <Slider
                value={[winRate]}
                onValueChange={(value) => setWinRate(value[0])}
                min={0}
                max={100}
                step={1}
              />
              <div className="text-sm text-gray-500">{winRate}%</div>
            </div>

            <div className="space-y-2">
              <Label>Odds</Label>
              <Input
                type="number"
                value={odds}
                onChange={(e) => setOdds(Number(e.target.value))}
                min={1.01}
                max={10}
                step={0.01}
              />
            </div>

            <div className="space-y-2">
              <Label>Simulation Days</Label>
              <Input
                type="number"
                value={simulationDays}
                onChange={(e) => setSimulationDays(Number(e.target.value))}
                min={1}
                max={365}
              />
            </div>

            <Button
              onClick={runSimulation}
              disabled={running}
              className="w-full"
            >
              {running ? 'Running Simulation...' : 'Run Simulation'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Final Balance</div>
                    <div className="text-2xl font-bold">
                      ${results[results.length - 1].balance.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">ROI</div>
                    <div className="text-2xl font-bold">
                      {calculateROI().toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={results}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#2563eb"
                        name="Balance"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Total Bets</div>
                    <div className="text-2xl font-bold">
                      {results[results.length - 1].bets}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <div className="text-sm text-gray-500">Win Rate</div>
                    <div className="text-2xl font-bold">
                      {((results[results.length - 1].wins / results[results.length - 1].bets) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                Run a simulation to see results
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
