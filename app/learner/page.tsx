import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, CheckCircle, Clock, Lightbulb, TrendingUp } from "lucide-react"
import { useState } from "react"
import LearnerProgress from "@/components/learner-progress"

export default function LearnerMode() {
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [selectedOdds, setSelectedOdds] = useState<string | null>(null);
  const [reviewing, setReviewing] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-white">
                  Learner Mode
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Master sports betting concepts through interactive lessons and simulated betting with AI feedback.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="apple-card p-6 w-full max-w-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Your Learning Journey</h3>
                    <p className="text-sm text-muted-foreground">Track your progress and earn rewards</p>
                  </div>
                </div>
                <LearnerProgress />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="lessons" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="lessons">Lessons</TabsTrigger>
              <TabsTrigger value="challenges">Daily Challenges</TabsTrigger>
              <TabsTrigger value="simulator">Betting Simulator</TabsTrigger>
            </TabsList>

            <TabsContent value="lessons" className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <LessonCard
                  title="Understanding Odds"
                  description="Learn how betting odds work and how to calculate implied probability."
                  duration="15 min"
                  completed={true}
                  onStart={() => setActiveLesson(title)} />
                <LessonCard
                  title="Value Betting"
                  description="Identify value in betting markets by comparing your probability estimates to bookmakers' odds."
                  duration="20 min"
                  completed={true}
                  onStart={() => setActiveLesson(title)} />
                <LessonCard
                  title="Bankroll Management"
                  description="Learn different staking strategies including flat betting, Kelly criterion, and unit-based approaches."
                  duration="25 min"
                  completed={false}
                  onStart={() => setActiveLesson(title)} />
                <LessonCard
                  title="Over/Under Markets"
                  description="Master the concepts behind total points markets and identify profitable opportunities."
                  duration="20 min"
                  completed={false}
                  onStart={() => setActiveLesson(title)} />
                <LessonCard
                  title="Line Movement"
                  description="Understand why betting lines move and what it means for finding value."
                  duration="15 min"
                  completed={false}
                  onStart={() => setActiveLesson(title)} />
                <LessonCard
                  title="Avoiding Common Biases"
                  description="Learn about cognitive biases that affect betting decisions and how to overcome them."
                  duration="30 min"
                  completed={false}
                  onStart={() => setActiveLesson(title)} />
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

            <TabsContent value="challenges" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Challenges</CardTitle>
                  <CardDescription>Complete these challenges to earn points and improve your skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Find Value Bets</h3>
                          <p className="text-sm text-muted-foreground">
                            Identify 3 moneyline bets with positive expected value
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <BookOpen className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Calculate Implied Probability</h3>
                          <p className="text-sm text-muted-foreground">
                            Convert 5 different odds formats to implied probability
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Clock className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Analyze Line Movement</h3>
                          <p className="text-sm text-muted-foreground">
                            Track and explain line movement for 2 upcoming games
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="simulator" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Betting Simulator</CardTitle>
                  <CardDescription>Practice betting with a virtual bankroll and get AI feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
                      <div>
                        <h3 className="font-medium">Virtual Bankroll</h3>
                        <p className="text-2xl font-bold">$1,000</p>
                      </div>
                      <Button>Add Funds</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Today's Games</h3>
                      <div className="grid gap-4">
                        <GameCard
                          team1="Los Angeles Lakers"
                          team2="Boston Celtics"
                          odds1="+150"
                          odds2="-180"
                          time="7:30 PM"
                          onStart={() => setActiveLesson(title)} />
                        <GameCard
                          team1="Kansas City Chiefs"
                          team2="San Francisco 49ers"
                          odds1="-120"
                          odds2="+100"
                          time="4:25 PM"
                          onStart={() => setActiveLesson(title)} />
                        <GameCard
                          team1="New York Yankees"
                          team2="Houston Astros"
                          odds1="-110"
                          odds2="-110"
                          time="1:05 PM"
                          onStart={() => setActiveLesson(title)} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

interface LessonCardProps {
  onStart?: () => void
  title: string
  description: string
  duration: string
  completed: boolean
}

function LessonCard({ title, description, duration, completed }: LessonCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {completed && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="min-h-[80px]">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          {duration}
        </div>
        <Button variant={completed ? "outline" : "default"} size="sm" onClick={onStart}>
          {completed ? "Review" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}

interface GameCardProps {
  team1: string
  team2: string
  odds1: string
  odds2: string
  time: string
}

function GameCard({ team1, team2, odds1, odds2, time }: GameCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted-foreground">Today, {time}</p>
        <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">NBA</div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex justify-between items-center mb-2">
            <p className="font-medium">{team1}</p>
            <Button variant="outline" size="sm">
              {odds1}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <p className="font-medium">{team2}</p>
            <Button variant="outline" size="sm">
              {odds2}
            </Button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center border-l pl-4">
          <Button className="w-full mb-2" onClick={() => alert(`Placed bet on odds: ${selectedOdds}`)}>Place Bet</Button>
          <Button variant="outline" className="w-full text-xs" onClick={() => setReviewing(true)}>
            View Analysis
          </Button>
        </div>
      </div>
    </div>
  )
}

            {reviewing && (
              <div className="mt-4 border p-4 rounded bg-muted">
                <h4 className="font-semibold mb-2">📊 AI Analysis</h4>
                <p>This is a placeholder for AI-powered betting odds analysis.</p>
                <Button onClick={() => setReviewing(false)} className="mt-2">
                  Close
                </Button>
              </div>
            )}
