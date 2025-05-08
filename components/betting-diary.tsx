"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Plus, CheckCircle2, XCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface Bet {
  id: string;
  date: string;
  event: string;
  market: string;
  stake: number;
  odds: number;
  result: 'win' | 'loss' | 'pending';
  modelPrediction: number;
  notes: string;
}

export default function BettingDiary() {
  const [bets, setBets] = useState<Bet[]>([
    {
      id: '1',
      date: '2024-03-20',
      event: 'LAL vs GSW',
      market: 'Moneyline',
      stake: 100,
      odds: -110,
      result: 'win',
      modelPrediction: 0.65,
      notes: 'Model showed strong value on Lakers'
    },
    {
      id: '2',
      date: '2024-03-19',
      event: 'BOS vs PHI',
      market: 'Total Points',
      stake: 50,
      odds: -110,
      result: 'loss',
      modelPrediction: 0.58,
      notes: 'Game went under despite high pace'
    }
  ]);

  const [isAddingBet, setIsAddingBet] = useState(false);
  const [newBet, setNewBet] = useState<Partial<Bet>>({
    result: 'pending'
  });

  const handleAddBet = () => {
    if (!newBet.event || !newBet.market || !newBet.stake || !newBet.odds) return;

    const bet: Bet = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      event: newBet.event,
      market: newBet.market,
      stake: newBet.stake,
      odds: newBet.odds,
      result: newBet.result as 'win' | 'loss' | 'pending',
      modelPrediction: newBet.modelPrediction || 0,
      notes: newBet.notes || ''
    };

    setBets([bet, ...bets]);
    setIsAddingBet(false);
    setNewBet({ result: 'pending' });
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'text-green-600';
      case 'loss': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Betting Diary</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsAddingBet(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Bet
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isAddingBet && (
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Event</Label>
                  <Input
                    value={newBet.event || ''}
                    onChange={(e) => setNewBet({ ...newBet, event: e.target.value })}
                    placeholder="e.g., LAL vs GSW"
                  />
                </div>
                <div>
                  <Label>Market</Label>
                  <Select
                    value={newBet.market}
                    onValueChange={(value) => setNewBet({ ...newBet, market: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select market" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="moneyline">Moneyline</SelectItem>
                      <SelectItem value="spread">Spread</SelectItem>
                      <SelectItem value="total">Total</SelectItem>
                      <SelectItem value="player_props">Player Props</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Stake</Label>
                  <Input
                    type="number"
                    value={newBet.stake || ''}
                    onChange={(e) => setNewBet({ ...newBet, stake: Number(e.target.value) })}
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <Label>Odds</Label>
                  <Input
                    type="number"
                    value={newBet.odds || ''}
                    onChange={(e) => setNewBet({ ...newBet, odds: Number(e.target.value) })}
                    placeholder="e.g., -110"
                  />
                </div>
              </div>

              <div>
                <Label>Notes</Label>
                <Textarea
                  value={newBet.notes || ''}
                  onChange={(e) => setNewBet({ ...newBet, notes: e.target.value })}
                  placeholder="Add any notes about this bet..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsAddingBet(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleAddBet}>
                  Add Bet
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {bets.map(bet => (
              <div key={bet.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{bet.event}</div>
                  <Badge variant="outline">{bet.market}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="text-sm text-gray-500">Stake</div>
                    <div className="font-medium">{formatCurrency(bet.stake)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Odds</div>
                    <div className="font-medium">{bet.odds}</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <div className="text-sm text-gray-500">Date</div>
                    <div className="font-medium">{formatDate(bet.date)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Result</div>
                    <div className={cn("font-medium flex items-center", getResultColor(bet.result))}>
                      {bet.result === 'win' && <CheckCircle2 className="h-4 w-4 mr-1" />}
                      {bet.result === 'loss' && <XCircle className="h-4 w-4 mr-1" />}
                      {bet.result.charAt(0).toUpperCase() + bet.result.slice(1)}
                    </div>
                  </div>
                </div>
                {bet.notes && (
                  <div className="text-sm text-gray-600 mt-2">
                    {bet.notes}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 