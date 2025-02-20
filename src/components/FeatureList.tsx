import { useState } from "react"
import { DndProvider, useDrag, useDrop } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
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

interface DraggableFeatureProps {
  feature: Feature
  index: number
  moveFeature: (dragIndex: number, hoverIndex: number) => void
}

const DraggableFeature = ({ feature, index, moveFeature }: DraggableFeatureProps) => {
  const [{ isDragging }, drag] = useDrag({
    type: "feature",
    item: { index, id: feature.id, status: feature.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: "feature",
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveFeature(item.index, index)
        item.index = index
      }
    },
  })

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="touch-none"
    >
      <FeatureCard
        title={feature.title}
        description={feature.description}
        status={feature.status}
        votes={feature.votes}
      />
    </div>
  )
}

interface ColumnProps {
  status: Feature["status"]
  features: Feature[]
  onDrop: (feature: Feature, status: Feature["status"]) => void
  moveFeature: (dragIndex: number, hoverIndex: number) => void
}

const Column = ({ status, features, onDrop, moveFeature }: ColumnProps) => {
  const [{ isOver }, drop] = useDrop({
    accept: "feature",
    drop: (item: Feature) => onDrop(item, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{columns[status].title}</h2>
      <div
        ref={drop}
        className={`min-h-[200px] rounded-lg border-2 ${columns[status].color} 
          ${isOver ? "bg-muted/50" : ""} p-4 space-y-4 transition-colors`}
      >
        {features.map((feature, index) => (
          <DraggableFeature
            key={feature.id}
            feature={feature}
            index={index}
            moveFeature={moveFeature}
          />
        ))}
      </div>
    </div>
  )
}

export function FeatureList() {
  const [features, setFeatures] = useState<Feature[]>(initialFeatures)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFeatures = features.filter(feature =>
    feature.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    feature.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const moveFeature = (dragIndex: number, hoverIndex: number) => {
    const newFeatures = [...features]
    const dragFeature = newFeatures[dragIndex]
    newFeatures.splice(dragIndex, 1)
    newFeatures.splice(hoverIndex, 0, dragFeature)
    setFeatures(newFeatures)
  }

  const handleDrop = (feature: Feature, newStatus: Feature["status"]) => {
    setFeatures(features.map(f => 
      f.id === feature.id ? { ...f, status: newStatus } : f
    ))
  }

  const getFeaturesByStatus = (status: Feature["status"]) =>
    filteredFeatures.filter(feature => feature.status === status)

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-8">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(columns) as Array<Feature["status"]>).map((status) => (
            <Column
              key={status}
              status={status}
              features={getFeaturesByStatus(status)}
              onDrop={handleDrop}
              moveFeature={moveFeature}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  )
}