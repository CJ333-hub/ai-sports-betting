"use client"

import { Progress } from "@/components/ui/progress"

export default function LearnerProgress() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Overall Progress</span>
          <span className="font-medium">35%</span>
        </div>
        <Progress value={35} className="h-2" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Lessons Completed</div>
          <div className="text-2xl font-bold">2/6</div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Challenges Completed</div>
          <div className="text-2xl font-bold">5/12</div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Simulated Bets</div>
          <div className="text-2xl font-bold">8</div>
        </div>
        <div className="border rounded-lg p-3">
          <div className="text-sm text-muted-foreground">Win Rate</div>
          <div className="text-2xl font-bold">62.5%</div>
        </div>
      </div>
    </div>
  )
}
