"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpRight, TrendingUp, Filter, SortAsc, SortDesc, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface EVOpportunity {
  id: string;
  sport: string;
  event: string;
  market: string;
  odds: number;
  probability: number;
  ev: number;
  confidence: number;
  bookmaker: string;
  timestamp: string;
  volume: number;
  edge: number;
}

export default function EVPanel() {
  const [opportunities, setOpportunities] = useState<EVOpportunity[]>([
    {
      id: '1',
      sport: 'NBA',
      event: 'Lakers vs Warriors',
      market: 'Lakers ML',
      odds: 2.15,
      probability: 0.52,
      ev: 0.118,
      confidence: 0.85,
      bookmaker: 'DraftKings',
      timestamp: '2024-03-20T15:30:00Z',
      volume: 15000,
      edge: 0.032
    },
    {
      id: '2',
      sport: 'NFL',
      event: 'Chiefs vs Bills',
      market: 'Over 48.5',
      odds: 1.95,
      probability: 0.58,
      ev: 0.131,
      confidence: 0.82,
      bookmaker: 'FanDuel',
      timestamp: '2024-03-20T16:00:00Z',
      volume: 25000,
      edge: 0.045
    },
    {
      id: '3',
      sport: 'MLB',
      event: 'Yankees vs Red Sox',
      market: 'Yankees -1.5',
      odds: 2.25,
      probability: 0.51,
      ev: 0.147,
      confidence: 0.78,
      bookmaker: 'BetMGM',
      timestamp: '2024-03-20T14:45:00Z',
      volume: 18000,
      edge: 0.038
    }
  ]);

  const [filter, setFilter] = useState({
    sport: 'all',
    minEV: 0,
    minConfidence: 0,
    sortBy: 'ev',
    sortOrder: 'desc'
  });

  const formatEV = (ev: number) => {
    return `${(ev * 100).toFixed(1)}%`;
  };

  const formatProbability = (prob: number) => {
    return `${(prob * 100).toFixed(1)}%`;
  };

  const formatVolume = (volume: number) => {
    return `$${(volume / 1000).toFixed(1)}k`;
  };

  const filteredOpportunities = opportunities
    .filter(opp => 
      (filter.sport === 'all' || opp.sport === filter.sport) &&
      opp.ev >= filter.minEV &&
      opp.confidence >= filter.minConfidence
    )
    .sort((a, b) => {
      const multiplier = filter.sortOrder === 'desc' ? -1 : 1;
      switch (filter.sortBy) {
        case 'ev':
          return (a.ev - b.ev) * multiplier;
        case 'confidence':
          return (a.confidence - b.confidence) * multiplier;
        case 'volume':
          return (a.volume - b.volume) * multiplier;
        default:
          return 0;
      }
    });

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <span>+EV Opportunities</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Select
              value={filter.sport}
              onValueChange={(value) => setFilter({ ...filter, sport: value })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sport" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sports</SelectItem>
                <SelectItem value="NBA">NBA</SelectItem>
                <SelectItem value="NFL">NFL</SelectItem>
                <SelectItem value="MLB">MLB</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filter.sortBy}
              onValueChange={(value) => setFilter({ ...filter, sortBy: value })}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ev">EV</SelectItem>
                <SelectItem value="confidence">Confidence</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setFilter({
                ...filter,
                sortOrder: filter.sortOrder === 'desc' ? 'asc' : 'desc'
              })}
            >
              {filter.sortOrder === 'desc' ? <SortDesc className="h-4 w-4" /> : <SortAsc className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredOpportunities.map((opp) => (
            <div key={opp.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-500">{opp.sport}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{opp.bookmaker}</span>
                  </div>
                  <div className="font-medium">{opp.event}</div>
                  <div className="text-sm text-gray-500">{opp.market}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-green-600">+{formatEV(opp.ev)}</div>
                  <div className="text-sm text-gray-500">EV</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-2">
                <div>
                  <div className="text-sm text-gray-500">Implied Probability</div>
                  <div className="font-medium">{formatProbability(opp.probability)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Confidence</div>
                  <div className="font-medium">{formatProbability(opp.confidence)}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Volume</div>
                  <div className="font-medium">{formatVolume(opp.volume)}</div>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Edge: <span className="text-green-600 font-medium">+{formatEV(opp.edge)}</span>
                </div>
                <Button variant="outline" size="sm" className="space-x-1">
                  <span>View Details</span>
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}