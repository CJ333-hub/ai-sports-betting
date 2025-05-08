"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, LineChart, School, Coins } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">AI Sports Betting Platform</h1>
        <p className="text-lg text-gray-600 mb-8">
          Advanced sports betting analysis and prediction platform powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/dashboard" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <LineChart className="h-5 w-5" />
                <span>Dashboard</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                View real-time predictions and performance analytics
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/model-builder" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5" />
                <span>Model Builder</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Create and train custom betting models
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/learner" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5" />
                <span>Learner Mode</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Interactive lessons and betting challenges
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/simulator" className="block">
          <Card className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Coins className="h-5 w-5" />
                <span>Simulator</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Test strategies with simulated bankroll
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Get Started</h2>
        <p className="text-gray-600 mb-6">
          Choose a feature above or explore our documentation to learn more
        </p>
        <Button asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
