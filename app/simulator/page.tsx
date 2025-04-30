import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, BarChart3, Droplet, Thermometer, User, Wind } from "lucide-react"
import SimulationResults from "@/components/simulation-results"

export default function SimulatorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl xl:text-5xl/none text-white">
                  What-If Simulator
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Test theories and simulate scenarios by adjusting variables like injuries, weather, and line
                  movements.
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
                    <h3 className="font-bold">Simulation History</h3>
                    <p className="text-sm text-muted-foreground">12 simulations run this week</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">NFL Weather Impact</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">NBA Star Player Out</p>
                      <p className="text-sm text-muted-foreground">Yesterday</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">MLB Line Movement</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
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
          <Tabs defaultValue="setup" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="setup">Simulation Setup</TabsTrigger>
              <TabsTrigger value="variables">Adjust Variables</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Set Up Your Simulation</CardTitle>
                  <CardDescription>Configure the base scenario for your simulation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="simulation-name">Simulation Name</Label>
                      <Input id="simulation-name" placeholder="e.g., NFL Weather Impact" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sport">Sport</Label>
                      <Select defaultValue="nfl">
                        <SelectTrigger>
                          <SelectValue placeholder="Select sport" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nfl">NFL (Football)</SelectItem>
                          <SelectItem value="nba">NBA (Basketball)</SelectItem>
                          <SelectItem value="mlb">MLB (Baseball)</SelectItem>
                          <SelectItem value="nhl">NHL (Hockey)</SelectItem>
                          <SelectItem value="soccer">Soccer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="game">Game</Label>
                      <Select defaultValue="chiefs-49ers">
                        <SelectTrigger>
                          <SelectValue placeholder="Select game" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chiefs-49ers">Kansas City Chiefs vs. San Francisco 49ers</SelectItem>
                          <SelectItem value="ravens-bengals">Baltimore Ravens vs. Cincinnati Bengals</SelectItem>
                          <SelectItem value="bills-dolphins">Buffalo Bills vs. Miami Dolphins</SelectItem>
                          <SelectItem value="cowboys-eagles">Dallas Cowboys vs. Philadelphia Eagles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="market">Betting Market</Label>
                      <Select defaultValue="spread">
                        <SelectTrigger>
                          <SelectValue placeholder="Select market" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="moneyline">Moneyline</SelectItem>
                          <SelectItem value="spread">Spread</SelectItem>
                          <SelectItem value="total">Total (Over/Under)</SelectItem>
                          <SelectItem value="props">Player Props</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Current Line</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">Kansas City Chiefs</p>
                              <p className="text-sm text-muted-foreground">Home Team</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">-3.5</p>
                              <p className="text-sm text-muted-foreground">-110</p>
                            </div>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">San Francisco 49ers</p>
                              <p className="text-sm text-muted-foreground">Away Team</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">+3.5</p>
                              <p className="text-sm text-muted-foreground">-110</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>
                        Continue to Variables
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="variables" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Adjust Variables</CardTitle>
                  <CardDescription>Modify key variables to see how they affect the outcome</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-medium">Weather Conditions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="flex items-center">
                              <Thermometer className="h-4 w-4 mr-2" />
                              Temperature
                            </Label>
                            <span className="text-sm font-medium">32°F</span>
                          </div>
                          <Slider defaultValue={[32]} min={0} max={100} step={1} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="flex items-center">
                              <Wind className="h-4 w-4 mr-2" />
                              Wind Speed
                            </Label>
                            <span className="text-sm font-medium">15 mph</span>
                          </div>
                          <Slider defaultValue={[15]} min={0} max={50} step={1} />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="flex items-center">
                              <Droplet className="h-4 w-4 mr-2" />
                              Precipitation
                            </Label>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <Slider defaultValue={[30]} min={0} max={100} step={1} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Player Status</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-full bg-blue-100 p-2">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Patrick Mahomes (QB)</p>
                                <p className="text-sm text-muted-foreground">Kansas City Chiefs</p>
                              </div>
                            </div>
                            <Select defaultValue="active">
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="questionable">Questionable (Limited)</SelectItem>
                                <SelectItem value="out">Out (Injured)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="border rounded-lg p-4">
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="rounded-full bg-blue-100 p-2">
                                <User className="h-4 w-4 text-blue-600" />
                              </div>
                              <div>
                                <p className="font-medium">Christian McCaffrey (RB)</p>
                                <p className="text-sm text-muted-foreground">San Francisco 49ers</p>
                              </div>
                            </div>
                            <Select defaultValue="questionable">
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="questionable">Questionable (Limited)</SelectItem>
                                <SelectItem value="out">Out (Injured)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Line Movement</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label>Spread Adjustment</Label>
                          <span className="text-sm font-medium">Chiefs -2.5</span>
                        </div>
                        <Slider defaultValue={[-2.5]} min={-7} max={7} step={0.5} />
                        <p className="text-sm text-muted-foreground">
                          Adjust the spread to simulate line movement (negative favors Chiefs, positive favors 49ers)
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button>
                        Run Simulation
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Simulation Results</CardTitle>
                  <CardDescription>Analysis of how the adjusted variables affect the betting outcome</CardDescription>
                </CardHeader>
                <CardContent>
                  <SimulationResults />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
