import { useState } from "react"
import { motion, AnimatePresence, Reorder } from "framer-motion"
import { FeatureCard } from "./FeatureCard"
import { Search } from "lucide-react"
import { Input } from "./ui/input"

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

const columns = {
  new: {
    title: "New Requests",
    color: "border-blue-500/20"
  },
  planned: {
    title: "Planned",
    color: "border-purple-500/20"
  },
  "in-progress": {
    title: "In Progress",
    color: "border-yellow-500/20"
  },
  done: {
    title: "Completed",
    color: "border-green-500/20"
  }
}

export function FeatureList() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getFeaturesByStatus = (status: Feature["status"]) =>
    filteredFeatures.filter(feature => feature.status === status)

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0"
      >
        <h1 className="text-3xl font-bold">Feature Requests</h1>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search features..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full md:w-[300px]"
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(columns).map(([status, { title, color }]) => (
          <div key={status} className="space-y-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className={`min-h-[200px] rounded-lg border-2 ${color} p-4 space-y-4`}>
              <Reorder.Group
                axis="y"
                values={getFeaturesByStatus(status as Feature["status"])}
                onReorder={(reorderedFeatures) => {
                  const newFeatures = [...features]
                  reorderedFeatures.forEach((feature, index) => {
                    const featureIndex = newFeatures.findIndex(f => f.id === feature.id)
                    if (featureIndex !== -1) {
                      newFeatures[featureIndex] = {
                        ...feature,
                        status: status as Feature["status"]
                      }
                    }
                  })
                  setFeatures(newFeatures)
                }}
              >
                <AnimatePresence>
                  {getFeaturesByStatus(status as Feature["status"]).map((feature) => (
                    <Reorder.Item
                      key={feature.id}
                      value={feature}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileDrag={{ scale: 1.02, boxShadow: "0 5px 20px rgba(0,0,0,0.2)" }}
                      className="touch-none"
                    >
                      <FeatureCard
                        title={feature.title}
                        description={feature.description}
                        status={feature.status}
                        votes={feature.votes}
                      />
                    </Reorder.Item>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}