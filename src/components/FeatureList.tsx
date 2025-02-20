import { useState } from "react"
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd"
import { motion, AnimatePresence } from "framer-motion"
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

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    const feature = features.find(f => f.id === parseInt(draggableId))
    if (!feature) return

    const newFeatures = [...features]
    const featureIndex = newFeatures.findIndex(f => f.id === feature.id)
    
    // Remove the feature from its current position
    newFeatures.splice(featureIndex, 1)
    
    // Update the status if moved to a different column
    const updatedFeature = {
      ...feature,
      status: destination.droppableId as Feature["status"]
    }
    
    // Find all features in the destination status
    const featuresInDestination = newFeatures.filter(
      f => f.status === destination.droppableId
    )
    
    // Calculate the position to insert the feature
    const insertIndex = newFeatures.findIndex(
      f => f.status === destination.droppableId
    ) + destination.index
    
    // Insert the feature at the new position
    newFeatures.splice(insertIndex, 0, updatedFeature)
    
    setFeatures(newFeatures)
  }

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

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(columns).map(([status, { title, color }]) => (
            <div key={status} className="space-y-4">
              <h2 className="text-lg font-semibold">{title}</h2>
              <Droppable droppableId={status}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`min-h-[200px] rounded-lg border-2 ${color} ${
                      snapshot.isDraggingOver ? "bg-muted/50" : ""
                    } p-4 space-y-4 transition-colors`}
                  >
                    <AnimatePresence>
                      {getFeaturesByStatus(status as Feature["status"]).map(
                        (feature, index) => (
                          <Draggable
                            key={feature.id}
                            draggableId={feature.id.toString()}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  opacity: snapshot.isDragging ? 0.8 : 1
                                }}
                              >
                                <FeatureCard
                                  title={feature.title}
                                  description={feature.description}
                                  status={feature.status}
                                  votes={feature.votes}
                                />
                              </div>
                            )}
                          </Draggable>
                        )
                      )}
                    </AnimatePresence>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}