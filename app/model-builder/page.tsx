import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Database, FileUp } from "lucide-react"
import ModelBuilder from "@/components/model-builder"

export default function ModelBuilderPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-white">
                  Predictive Model Builder
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Create custom betting models with no coding required. Our AI analyzes historical data to identify
                  profitable patterns.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="apple-card p-6 w-full max-w-md">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="rounded-full bg-blue-100 p-2">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold">Your Models</h3>
                    <p className="text-sm text-muted-foreground">3 active models</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">NBA Player Props</p>
                      <p className="text-sm text-muted-foreground">62% accuracy</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">NFL Underdog ML</p>
                      <p className="text-sm text-muted-foreground">58% accuracy</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">MLB Totals</p>
                      <p className="text-sm text-muted-foreground">55% accuracy</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="create">Create Model</TabsTrigger>
              <TabsTrigger value="datasets">Datasets</TabsTrigger>
              <TabsTrigger value="predictions">Predictions</TabsTrigger>
            </TabsList>

            <TabsContent value="create" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Create a New Predictive Model</CardTitle>
                  <CardDescription>
                    Build a custom model to predict sports outcomes based on historical data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ModelBuilder />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="datasets" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Available Datasets</CardTitle>
                  <CardDescription>Browse and manage datasets for your predictive models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <h3 className="font-medium">Upload New Dataset</h3>
                        <p className="text-sm text-muted-foreground">Upload CSV files with historical sports data</p>
                      </div>
                      <Button>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Your Datasets</h3>
                      <div className="grid gap-4">
                        <DatasetCard
                          name="NBA Team Stats 2023-24"
                          type="Basketball"
                          records="1,230 games"
                          updated="2 days ago"
                        />
                        <DatasetCard
                          name="NFL Game Data 2022-23"
                          type="Football"
                          records="285 games"
                          updated="1 week ago"
                        />
                        <DatasetCard
                          name="MLB Player Props"
                          type="Baseball"
                          records="2,430 games"
                          updated="3 days ago"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Public Datasets</h3>
                      <div className="grid gap-4">
                        <DatasetCard
                          name="Premier League 2022-23"
                          type="Soccer"
                          records="380 games"
                          updated="2 months ago"
                        />
                        <DatasetCard
                          name="NBA Player Stats (5 seasons)"
                          type="Basketball"
                          records="6,150 games"
                          updated="1 month ago"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Today's Predictions</CardTitle>
                  <CardDescription>View predictions from your active models</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">NBA Player Props Model</h3>
                          <p className="text-sm text-muted-foreground">Predictions for tonight's games</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded">
                          High Confidence
                        </div>
                      </div>

                      <div className="space-y-4">
                        <PredictionCard
                          player="LeBron James"
                          stat="Points"
                          line="Over 26.5"
                          confidence={72}
                          explanation="LeBron has exceeded this line in 8 of last 10 games against teams with bottom-10 defensive ratings."
                        />
                        <PredictionCard
                          player="Stephen Curry"
                          stat="3-Pointers Made"
                          line="Over 4.5"
                          confidence={68}
                          explanation="Curry averages 5.8 three-pointers at home this season and the opponent allows the 3rd most three-point attempts."
                        />
                        <PredictionCard
                          player="Nikola Jokić"
                          stat="Assists"
                          line="Over 9.5"
                          confidence={65}
                          explanation="Jokić has recorded 10+ assists in 7 of his last 8 games against this opponent."
                        />
                      </div>
                    </div>

                    <div className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-medium">NFL Underdog ML Model</h3>
                          <p className="text-sm text-muted-foreground">Predictions for upcoming games</p>
                        </div>
                        <div className="bg-yellow-100 text-yellow-600 text-xs font-medium px-2 py-1 rounded">
                          Medium Confidence
                        </div>
                      </div>

                      <div className="space-y-4">
                        <PredictionCard
                          player="Minnesota Vikings"
                          stat="Moneyline"
                          line="+160"
                          confidence={58}
                          explanation="Vikings have strong defensive metrics that match up well against opponent's offensive scheme."
                        />
                        <PredictionCard
                          player="Miami Dolphins"
                          stat="Moneyline"
                          line="+135"
                          confidence={55}
                          explanation="Weather conditions favor Miami's offensive style and the opponent has struggled in similar conditions."
                        />
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

interface DatasetCardProps {
  name: string
  type: string
  records: string
  updated: string
}

function DatasetCard({ name, type, records, updated }: DatasetCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          <div className="rounded-full bg-blue-100 p-2 mt-1">
            <Database className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">{name}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{type}</span>
              <span>•</span>
              <span>{records}</span>
              <span>•</span>
              <span>Updated {updated}</span>
            </div>
          </div>
        </div>
        <Button variant="outline" size="sm">
          Use
        </Button>
      </div>
    </div>
  )
}

interface PredictionCardProps {
  player: string
  stat: string
  line: string
  confidence: number
  explanation: string
}

function PredictionCard({ player, stat, line, confidence, explanation }: PredictionCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="flex justify-between mb-2">
            <div>
              <h4 className="font-medium">{player}</h4>
              <p className="text-sm text-muted-foreground">
                {stat}: {line}
              </p>
            </div>
            <div className="text-right">
              <div className="font-medium text-blue-600">{confidence}%</div>
              <p className="text-sm text-muted-foreground">Confidence</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{explanation}</p>
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
  )
}
