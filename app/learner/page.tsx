"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, ChevronRight } from "lucide-react";

const lessons = [
  {
    id: 1,
    title: "Understanding Odds",
    description: "Learn how to read and interpret betting odds",
    content: "Betting odds represent the probability of an event occurring. They can be displayed in different formats: decimal, fractional, or American. Understanding these formats is crucial for making informed betting decisions.",
    completed: false
  },
  {
    id: 2,
    title: "Value Betting",
    description: "Identify when odds offer value",
    content: "Value betting is finding odds that are higher than the true probability of an event occurring. This is the key to long-term profitability in sports betting.",
    completed: false
  },
  {
    id: 3,
    title: "Bankroll Management",
    description: "Learn how to manage your betting funds",
    content: "Proper bankroll management is essential for long-term success. Learn about unit sizing, risk management, and how to protect your betting capital.",
    completed: false
  }
];

export default function LearnerPage() {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const handleCompleteLesson = () => {
    if (!completedLessons.includes(currentLesson)) {
      setCompletedLessons([...completedLessons, currentLesson]);
      setProgress(((completedLessons.length + 1) / lessons.length) * 100);
    }
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Learner Mode</h1>
        <div className="flex items-center space-x-2">
          <Progress value={progress} className="w-[200px]" />
          <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>{lessons[currentLesson].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-500">{lessons[currentLesson].description}</p>
              <div className="prose max-w-none">
                <p>{lessons[currentLesson].content}</p>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCompleteLesson} className="space-x-2">
                  <span>Complete Lesson</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Course Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      index === currentLesson ? 'bg-blue-50' : ''
                    }`}
                  >
                    {completedLessons.includes(index) ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-gray-300" />
                    )}
                    <span className={completedLessons.includes(index) ? 'text-green-500' : ''}>
                      {lesson.title}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}