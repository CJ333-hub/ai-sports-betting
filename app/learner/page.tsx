"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const lessons = [
  {
    title: "Understanding Moneylines",
    description: "Learn how to read and interpret moneyline odds.",
    completed: true,
  },
  {
    title: "Point Spreads",
    description: "Understand how point spreads work in different sports.",
    completed: false,
  },
  {
    title: "Over/Under Bets",
    description: "Learn what totals mean and how to bet on them.",
    completed: false,
  },
];

export default function Page() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="lessons" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lessons">Lessons</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="lessons">
          <div className="grid gap-6 sm:grid-cols-2">
            {lessons.map(({ title, description, completed }) => (
              <Card key={title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <Button
                    variant={completed ? "outline" : "default"}
                    size="sm"
                    onClick={() => setActiveLesson(title)}
                  >
                    {completed ? "Review" : "Start"}
                  </Button>
                  {completed && <Badge variant="secondary">Completed</Badge>}
                </CardContent>
              </Card>
            ))}
          </div>

          {activeLesson && (
            <div className="mt-6 p-4 border rounded bg-muted">
              <h4 className="font-semibold mb-2">📘 Reviewing: {activeLesson}</h4>
              <p>This is where your review content or quiz would go for "{activeLesson}".</p>
              <Button onClick={() => setActiveLesson(null)} className="mt-2">
                Close
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="quiz">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Quiz mode coming soon!
          </div>
        </TabsContent>

        <TabsContent value="resources">
          <div className="text-center text-gray-500 dark:text-gray-400">
            Useful resources will appear here.
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
