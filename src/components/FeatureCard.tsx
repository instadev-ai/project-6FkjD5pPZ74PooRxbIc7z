import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { ArrowUpCircle } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  status: "new" | "planned" | "in-progress" | "done"
  votes: number
}

const statusColors = {
  new: "bg-blue-500/20 text-blue-500",
  planned: "bg-purple-500/20 text-purple-500",
  "in-progress": "bg-yellow-500/20 text-yellow-500",
  done: "bg-green-500/20 text-green-500",
}

const statusLabels = {
  new: "New",
  planned: "Planned",
  "in-progress": "In Progress",
  done: "Done",
}

export function FeatureCard({ title, description, status, votes }: FeatureCardProps) {
  return (
    <Card className="transition-all hover:shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h3>
          <Badge variant="secondary" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center space-y-1"
        >
          <ArrowUpCircle className="h-4 w-4" />
          <span className="text-sm font-medium">{votes}</span>
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}