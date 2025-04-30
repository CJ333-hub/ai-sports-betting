import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
}

export default function TestimonialCard({ quote, author, role }: TestimonialCardProps) {
  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex-1">
            <p className="italic text-muted-foreground">"{quote}"</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center">
              <span className="text-blue-600 font-bold">
                {author.split(" ")[0][0]}
                {author.split(" ")[1][0]}
              </span>
            </div>
            <div>
              <p className="font-medium">{author}</p>
              <p className="text-sm text-muted-foreground">{role}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
