import { useState } from "react"
import { FeatureCard } from "./FeatureCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { motion } from "framer-motion"
import { Input } from "./ui/input"
import { Search } from "lucide-react"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

type Feature = {
  id: number
  title: string
  description: string
  status: "new" | "planned" | "in-progress" | "done"
  votes: number
  category: string
}

const initialFeatures: Feature[] = [
  {
    id: 1,
    title: "Dark Mode Support",
    description: "Add dark mode support to improve accessibility and reduce eye strain",
    status: "planned",
    votes: 42,
    category: "ui"
  },
  {
    id: 2,
    title: "Mobile App",
    description: "Create a native mobile app for iOS and Android",
    status: "in-progress",
    votes: 38,
    category: "functionality"
  },
  {
    id: 3,
    title: "API Integration",
    description: "Allow integration with popular third-party services",
    status: "new",
    votes: 25,
    category: "integration"
  }
]

export function FeatureList() {
  const [features] = useState<Feature[]>(initialFeatures)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("most-voted")

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const sortedFeatures = [...filteredFeatures].sort((a, b) => {
    switch (sortBy) {
      case "most-voted":
        return b.votes - a.votes
      case "newest":
        return b.id - a.id
      case "oldest":
        return a.id - b.id
      default:
        return 0
    }
  })

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <h1 className="text-3xl font-bold">Feature Requests</h1>
        <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search features..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="most-voted">Most Voted</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4"
      >
        {sortedFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            status={feature.status}
            votes={feature.votes}
          />
        ))}
        {sortedFeatures.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            No features found matching your search.
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}