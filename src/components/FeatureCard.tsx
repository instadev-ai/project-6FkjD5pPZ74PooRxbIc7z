import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader } from "./ui/card"
import { ArrowUpCircle } from "lucide-react"
import { motion } from "framer-motion"

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

const MotionCard = motion(Card)

export function FeatureCard({ title, description, votes }: FeatureCardProps) {
  return (
    <MotionCard 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="transition-all cursor-grab active:cursor-grabbing"
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="text-sm font-semibold leading-none tracking-tight">
            {title}
          </h3>
        </div>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button
            variant="ghost"
            size="sm"
            className="flex flex-col items-center space-y-1"
          >
            <motion.div
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ArrowUpCircle className="h-4 w-4" />
            </motion.div>
            <span className="text-sm font-medium">{votes}</span>
          </Button>
        </motion.div>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </MotionCard>
  )
}