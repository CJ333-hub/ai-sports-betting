"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowUp, Cloud, Droplet, Thermometer, User, Wind } from "lucide-react"

export default function SimulationResults() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-medium mb-4">Outcome Probability</h3>
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="font-medium">Kansas City Chiefs -2.5</p>
                <p className="text-sm text-muted-foreground">Cover Probability</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">58%</p>
                <p className="text-sm text-green-600 flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  +12% from baseline
                </p>
              </div>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex justify-between text-sm">
                <span>Original Probability (46%)</span>
                <span>New Probability (58%)</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="flex h-full">
                  <div className="bg-gray-400 h-full" style={{ width: "46%" }}></div>
                  <div className="bg-blue-600 h-full" style={{ width: "12%" }}></div>
                  <div className="bg-gray-100 h-full flex-1"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Expected Score</div>
                <div className="text-xl font-bold">KC 24 - SF 20</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Recommended Bet</div>
                <div className="text-xl font-bold text-green-600">Chiefs -2.5</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Variable Impact</h3>
          <div className="border rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Thermometer className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Cold Temperature (32°F)</p>
                  <p className="font-medium text-green-600">+5%</p>
                </div>
                <p className="text-sm text-muted-foreground">Cold weather favors Chiefs' running game and defense</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Wind className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">High Wind Speed (15 mph)</p>
                  <p className="font-medium text-green-600">+4%</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wind impacts passing game, favoring Chiefs' short passing attack
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Droplet className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Precipitation (30%)</p>
                  <p className="font-medium text-green-600">+3%</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wet conditions favor the team with stronger running game
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">McCaffrey Limited (Questionable)</p>
                  <p className="font-medium text-green-600">+8%</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Limited star RB significantly impacts 49ers' offensive production
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-blue-100 p-2">
                <Cloud className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Line Movement (1 point)</p>
                  <p className="font-medium text-red-600">-8%</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  Line movement from -3.5 to -2.5 increases value on Chiefs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="p-6">
        <h3 className="font-medium mb-4">AI Analysis</h3>
        <div className="space-y-4">
          <p>
            Based on the simulated conditions, the Kansas City Chiefs have a significantly improved chance of covering
            the spread against the San Francisco 49ers. The combination of cold weather, wind, and the questionable
            status of Christian McCaffrey creates favorable conditions for the Chiefs.
          </p>
          <p>
            The most impactful variable is McCaffrey's limited status, which reduces the 49ers' offensive efficiency by
            an estimated 12%. The cold temperature and wind conditions also favor the Chiefs' style of play, as they
            rely less on deep passing and more on short/intermediate routes and a strong running game.
          </p>
          <p>
            The line movement from -3.5 to -2.5 provides additional value, as our model suggests the true line should be
            closer to Chiefs -4 under these conditions. This represents a 1.5-point edge compared to the current market.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg mt-4">
            <p className="font-medium text-blue-800">Recommendation</p>
            <p className="text-blue-700">
              Consider a bet on Chiefs -2.5 with these simulated conditions. The model suggests this has positive
              expected value with a 58% probability of covering the spread.
            </p>
          </div>
        </div>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline">Save Simulation</Button>
        <div className="space-x-2">
          <Button variant="outline">Adjust Variables</Button>
          <Button>Run New Simulation</Button>
        </div>
      </div>
    </div>
  )
}
