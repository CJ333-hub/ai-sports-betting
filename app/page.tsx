import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, BookOpen, TrendingUp } from "lucide-react"
import FeatureCard from "@/components/feature-card"
import TestimonialCard from "@/components/testimonial-card"
import Dashboard from "@/app/Dashboard";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg py-20 md:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-white">
                  AI-Powered Sports Betting Intelligence
                </h1>
                <p className="max-w-[600px] text-white/80 md:text-xl">
                  Learn, predict, and simulate sports bets with our AI platform designed for casual bettors.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                  <Link href="/learner">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  <Link href="/model-builder">Build Your Model</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[500px]">
                <div className="apple-card overflow-hidden p-2">
                  <img
                    src="/placeholder.svg?height=600&width=400"
                    alt="App interface showing betting predictions"
                    className="w-full h-auto rounded-xl"
                    width={400}
                    height={600}
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 apple-card p-4 w-40">
                  <div className="text-sm font-medium">Win Probability</div>
                  <div className="text-2xl font-bold text-blue-600">68%</div>
                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-warm-neutral-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Smart Tools for Every Bettor
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're just starting out or looking to refine your strategy, our platform has the tools you
                need.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-blue-600" />}
              title="Learner Mode"
              description="Interactive lessons and simulated betting with AI feedback to help you understand odds, value, and bankroll management."
            />
            <FeatureCard
              icon={<BarChart3 className="h-10 w-10 text-blue-600" />}
              title="Predictive Model Builder"
              description="No-code AI tools to build custom betting models using historical data and advanced analytics."
            />
            <FeatureCard
              icon={<TrendingUp className="h-10 w-10 text-blue-600" />}
              title="What-If Simulator"
              description="Test theories and simulate scenarios by adjusting variables like injuries, weather, and line movements."
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">How It Works</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                From Beginner to Confident Bettor
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform guides you through every step of your betting journey.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3 mt-12">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <div className="rounded-full bg-blue-600 w-10 h-10 flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Learn the Basics</h3>
                  <p className="text-muted-foreground">
                    Start with interactive lessons on odds, probability, and bankroll management in Learner Mode.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <div className="rounded-full bg-blue-600 w-10 h-10 flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Build Your Model</h3>
                  <p className="text-muted-foreground">
                    Use our no-code AI tools to create predictive models based on historical data and trends.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="rounded-full bg-blue-100 p-3">
                    <div className="rounded-full bg-blue-600 w-10 h-10 flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <h3 className="text-xl font-bold">Test and Refine</h3>
                  <p className="text-muted-foreground">
                    Simulate scenarios, track your performance, and get AI feedback to continuously improve your
                    strategy.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-soft-blue-100">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-600">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Users Say</h2>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
            <TestimonialCard
              quote="The Learner Mode helped me understand betting odds and value for the first time. I'm making much smarter decisions now."
              author="Michael T."
              role="Beginner Bettor"
            />
            <TestimonialCard
              quote="I built a model for NBA player props that's hitting at 62%. The no-code interface makes it so easy to test theories."
              author="Sarah K."
              role="Data-Curious Bettor"
            />
            <TestimonialCard
              quote="The What-If Simulator helped me identify key factors that were affecting my MLB bets. My ROI has improved significantly."
              author="James L."
              role="Sharpening Bettor"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-bg py-20">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to Transform Your Betting Strategy?
              </h2>
              <p className="max-w-[600px] text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of bettors who are learning, predicting, and winning with BetSmart AI.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-white/90">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
