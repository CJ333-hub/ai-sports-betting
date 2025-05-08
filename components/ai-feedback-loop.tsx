"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Brain, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type Sentiment = 'positive' | 'negative' | 'neutral';

interface Feedback {
  id: string;
  date: string;
  prediction: string;
  actual: string;
  feedback: string;
  sentiment: Sentiment;
  modelAdjustments: string[];
}

interface NewFeedback {
  prediction: string;
  actual: string;
  feedback: string;
  sentiment: Sentiment;
}

export default function AIFeedbackLoop() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: '1',
      date: '2024-03-20',
      prediction: 'LAL -3.5',
      actual: 'LAL -5',
      feedback: 'Model underestimated Lakers\' home court advantage',
      sentiment: 'positive',
      modelAdjustments: [
        'Increased weight of home court factor by 15%',
        'Adjusted pace factor for Lakers games'
      ]
    },
    {
      id: '2',
      date: '2024-03-19',
      prediction: 'BOS vs PHI Over 220.5',
      actual: 'Under 220.5',
      feedback: 'Model didn\'t account for defensive adjustments',
      sentiment: 'negative',
      modelAdjustments: [
        'Added defensive rating trend analysis',
        'Incorporated coach\'s defensive scheme history'
      ]
    }
  ]);

  const [newFeedback, setNewFeedback] = useState<NewFeedback>({
    prediction: '',
    actual: '',
    feedback: '',
    sentiment: 'neutral'
  });

  const handleSubmitFeedback = () => {
    if (!newFeedback.prediction || !newFeedback.actual || !newFeedback.feedback) return;

    const feedback: Feedback = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      prediction: newFeedback.prediction,
      actual: newFeedback.actual,
      feedback: newFeedback.feedback,
      sentiment: newFeedback.sentiment,
      modelAdjustments: [
        'Analyzing feedback patterns...',
        'Adjusting model weights...'
      ]
    };

    setFeedbacks([feedback, ...feedbacks]);
    setNewFeedback({
      prediction: '',
      actual: '',
      feedback: '',
      sentiment: 'neutral'
    });
  };

  const getSentimentColor = (sentiment: Sentiment) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI Feedback Loop</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Prediction</Label>
                <Textarea
                  value={newFeedback.prediction}
                  onChange={(e) => setNewFeedback({ ...newFeedback, prediction: e.target.value })}
                  placeholder="What was the model's prediction?"
                />
              </div>
              <div>
                <Label>Actual Result</Label>
                <Textarea
                  value={newFeedback.actual}
                  onChange={(e) => setNewFeedback({ ...newFeedback, actual: e.target.value })}
                  placeholder="What was the actual result?"
                />
              </div>
            </div>

            <div>
              <Label>Feedback</Label>
              <Textarea
                value={newFeedback.feedback}
                onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                placeholder="What factors did the model miss or get right?"
              />
            </div>

            <div className="flex items-center space-x-4">
              <Label>Sentiment</Label>
              <div className="flex space-x-2">
                <Button
                  variant={newFeedback.sentiment === 'positive' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewFeedback({ ...newFeedback, sentiment: 'positive' })}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Positive
                </Button>
                <Button
                  variant={newFeedback.sentiment === 'negative' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setNewFeedback({ ...newFeedback, sentiment: 'negative' })}
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Negative
                </Button>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleSubmitFeedback}>
                Submit Feedback
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            {feedbacks.map(feedback => (
              <div key={feedback.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-medium">Feedback #{feedback.id}</span>
                  </div>
                  <Badge variant="outline">{feedback.date}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Prediction</div>
                    <div className="font-medium">{feedback.prediction}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Actual</div>
                    <div className="font-medium">{feedback.actual}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-500">Feedback</div>
                  <div className={cn("font-medium", getSentimentColor(feedback.sentiment))}>
                    {feedback.feedback}
                  </div>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Model Adjustments</div>
                  <ul className="space-y-1">
                    {feedback.modelAdjustments.map((adjustment, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {adjustment}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 