"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, X, Brain, LineChart, School, Coins, BarChart3, BookOpen, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Model Builder', href: '/model-builder', icon: Brain },
  { name: 'Analysis', href: '/analysis', icon: BookOpen },
  { name: 'Simulator', href: '/simulator', icon: PlayCircle },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-white"
              >
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
            </div>
            <span className="font-bold text-xl">BetSmart AI</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Button
                key={item.name}
                variant={pathname === item.href ? 'default' : 'ghost'}
                asChild
              >
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </Button>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/docs">Documentation</Link>
          </Button>
          <Button asChild>
            <Link href="/dashboard">Get Started</Link>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="default" className="hidden md:flex">
            Sign In
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border/40">
          <div className="container py-4 flex flex-col gap-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.name}
                  variant={pathname === item.href ? 'default' : 'ghost'}
                  asChild
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary p-2",
                      pathname === item.href ? "text-foreground bg-muted rounded-md" : "text-muted-foreground",
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </Button>
              )
            })}
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" className="w-full justify-start">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="default" className="w-full">
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
