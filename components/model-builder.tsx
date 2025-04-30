"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, BarChart3, Check, Database, PieChart, Settings, Zap } from "lucide-react"

export default function ModelBuilder() {
  const [step, setStep] = useState(1)

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="space-y-8">
      {/* Progress Steps */}
      <div className="flex justify-between">
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {step > 1 ? <Check className="h-4 w-4" /> : 1}
          </div>
          <span className={step >= 1 ? "font-medium" : "text-muted-foreground"}>Dataset</span>
        </div>
        <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2">
          <div className={`h-full bg-blue-600 ${step >= 2 ? "w-full" : "w-0"} transition-all duration-300`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {step > 2 ? <Check className="h-4 w-4" /> : 2}
          </div>
          <span className={step >= 2 ? "font-medium" : "text-muted-foreground"}>Configuration</span>
        </div>
        <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2">
          <div className={`h-full bg-blue-600 ${step >= 3 ? "w-full" : "w-0"} transition-all duration-300`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            {step > 3 ? <Check className="h-4 w-4" /> : 3}
          </div>
          <span className={step >= 3 ? "font-medium" : "text-muted-foreground"}>Training</span>
        </div>
        <div className="h-0.5 flex-1 bg-gray-200 self-center mx-2">
          <div className={`h-full bg-blue-600 ${step >= 4 ? "w-full" : "w-0"} transition-all duration-300`}></div>
        </div>
        <div className="flex items-center space-x-2">
          <div
            className={`rounded-full w-8 h-8 flex items-center justify-center ${step >= 4 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
          >
            4
          </div>
          <span className={step >= 4 ? "font-medium" : "text-muted-foreground"}>Results</span>
        </div>
      </div>

      {/* Step 1: Dataset Selection */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Select a Dataset</h3>
            <p className="text-muted-foreground mb-4">Choose a dataset to train your predictive model</p>

            <div className="grid gap-4">
              <Card className="p-4 border-2 border-blue-600">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-blue-100 p-2 mt-1">
                    <Database className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium">NBA Team Stats 2023-24</h3>
                      <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">Selected</div>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Basketball</span>
                      <span>•</span>
                      <span>1,230 games</span>
                      <span>•</span>
                      <span>Updated 2 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-600 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-blue-100 p-2 mt-1">
                    <Database className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">NFL Game Data 2022-23</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Football</span>
                      <span>•</span>
                      <span>285 games</span>
                      <span>•</span>
                      <span>Updated 1 week ago</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 hover:border-blue-600 cursor-pointer">
                <div className="flex items-start space-x-3">
                  <div className="rounded-full bg-blue-100 p-2 mt-1">
                    <Database className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">MLB Player Props</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>Baseball</span>
                      <span>•</span>
                      <span>2,430 games</span>
                      <span>•</span>
                      <span>Updated 3 days ago</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" disabled>
              Back
            </Button>
            <Button onClick={nextStep}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Model Configuration */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Configure Your Model</h3>
            <p className="text-muted-foreground mb-4">Set up the parameters for your predictive model</p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="model-name">Model Name</Label>
                <Input
                  id="model-name"
                  placeholder="e.g., NBA Points Predictor"
                  defaultValue="NBA Win Probability Model"
                />
              </div>

              <div className="space-y-2">
                <Label>Market Type</Label>
                <RadioGroup defaultValue="moneyline" className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moneyline" id="moneyline" />
                    <Label htmlFor="moneyline" className="font-normal">
                      Moneyline
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="spread" id="spread" />
                    <Label htmlFor="spread" className="font-normal">
                      Spread
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="total" id="total" />
                    <Label htmlFor="total" className="font-normal">
                      Total (Over/Under)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="props" id="props" />
                    <Label htmlFor="props" className="font-normal">
                      Player Props
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="prediction-goal">Prediction Goal</Label>
                <Select defaultValue="win-probability">
                  <SelectTrigger>
                    <SelectValue placeholder="Select prediction goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="win-probability">Win Probability</SelectItem>
                    <SelectItem value="expected-points">Expected Points</SelectItem>
                    <SelectItem value="cover-probability">Cover Probability</SelectItem>
                    <SelectItem value="over-under-probability">Over/Under Probability</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Feature Importance</Label>
                <div className="space-y-4 pt-2">
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Recent Form</span>
                      <span className="text-sm font-medium">High</span>
                    </div>
                    <Slider defaultValue={[75]} max={100} step={1} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Head-to-Head History</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <Slider defaultValue={[50]} max={100} step={1} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Home/Away Performance</span>
                      <span className="text-sm font-medium">Medium</span>
                    </div>
                    <Slider defaultValue={[60]} max={100} step={1} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span className="text-sm">Injuries/Roster Changes</span>
                      <span className="text-sm font-medium">High</span>
                    </div>
                    <Slider defaultValue={[80]} max={100} step={1} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Model Training */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">Train Your Model</h3>
            <p className="text-muted-foreground mb-4">
              Configure training parameters and start the model training process
            </p>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Training Data Split</Label>
                <div className="h-8 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="flex h-full">
                    <div className="bg-blue-600 h-full w-[70%] flex items-center justify-center text-xs text-white">
                      Training (70%)
                    </div>
                    <div className="bg-blue-400 h-full w-[15%] flex items-center justify-center text-xs text-white">
                      Validation (15%)
                    </div>
                    <div className="bg-blue-300 h-full w-[15%] flex items-center justify-center text-xs text-white">
                      Test (15%)
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Model Complexity</Label>
                <RadioGroup defaultValue="medium" className="grid grid-cols-3 gap-4 pt-2">
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                    <RadioGroupItem value="simple" id="simple" />
                    <Label htmlFor="simple" className="font-normal">
                      Simple
                    </Label>
                    <p className="text-xs text-muted-foreground text-center">
                      Faster training, less prone to overfitting
                    </p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border-2 border-blue-600 rounded-lg p-4">
                    <RadioGroupItem value="medium" id="medium" checked />
                    <Label htmlFor="medium" className="font-normal">
                      Medium
                    </Label>
                    <p className="text-xs text-muted-foreground text-center">Balanced approach for most use cases</p>
                  </div>
                  <div className="flex flex-col items-center space-y-2 border rounded-lg p-4">
                    <RadioGroupItem value="complex" id="complex" />
                    <Label htmlFor="complex" className="font-normal">
                      Complex
                    </Label>
                    <p className="text-xs text-muted-foreground text-center">Higher accuracy, requires more data</p>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Advanced Options</Label>
                <Card className="p-4">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Feature Engineering</p>
                        <p className="text-sm text-muted-foreground">
                          Automatically create new features from existing data
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Hyperparameter Tuning</p>
                        <p className="text-sm text-muted-foreground">
                          Optimize model parameters for better performance
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-4 w-4" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>
              Train Model
              <Zap className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Results */}
      {step === 4 && (
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="rounded-full bg-green-100 p-2">
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">Model Training Complete</h3>
            </div>

            <Card className="p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Model Performance</h4>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Accuracy</span>
                        <span className="text-sm font-medium">68.5%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: "68.5%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">ROI</span>
                        <span className="text-sm font-medium">12.3%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-600 rounded-full" style={{ width: "62.3%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm">Confidence Score</span>
                        <span className="text-sm font-medium">High</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-600 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-4">Key Insights</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Home teams with 3+ days rest have a 58% win rate against the spread</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Teams with a defensive rating in the top 10 win 62% of games as underdogs</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <div className="rounded-full bg-blue-100 p-1 mt-0.5">
                        <Check className="h-3 w-3 text-blue-600" />
                      </div>
                      <span>Teams shooting above 37% from three-point range cover the spread 55% of the time</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            <div className="space-y-4">
              <h4 className="font-medium">Today's Predictions</h4>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Los Angeles Lakers vs. Boston Celtics</h4>
                          <p className="text-sm text-muted-foreground">Lakers Moneyline (+150)</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-600">68%</div>
                          <p className="text-sm text-muted-foreground">Win Probability</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lakers have won 7 of their last 8 games against teams with a defensive rating below league
                        average.
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center border-l pl-4">
                      <Button className="w-full mb-2" size="sm">
                        Place Bet
                      </Button>
                      <Button variant="outline" className="w-full text-xs" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-3">
                      <div className="flex justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Golden State Warriors vs. Denver Nuggets</h4>
                          <p className="text-sm text-muted-foreground">Over 228.5 Points (-110)</p>
                        </div>
                        <div className="text-right">
                          <div className="font-medium text-blue-600">72%</div>
                          <p className="text-sm text-muted-foreground">Hit Probability</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Both teams rank in the top 5 in pace, and their last 6 matchups have gone over the total.
                      </p>
                    </div>
                    <div className="flex flex-col justify-center items-center border-l pl-4">
                      <Button className="w-full mb-2" size="sm">
                        Place Bet
                      </Button>
                      <Button variant="outline" className="w-full text-xs" size="sm">
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <div className="space-x-2">
              <Button variant="outline">
                <PieChart className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
              <Button>
                <BarChart3 className="mr-2 h-4 w-4" />
                Save Model
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
