import { useDrag } from "react-dnd";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  id: string;
  title: string;
  description: string;
  votes: number;
  status: "new" | "planned" | "in-progress" | "completed";
  onVote: (id: string) => void;
}

const statusColors = {
  new: "bg-blue-500",
  planned: "bg-purple-500",
  "in-progress": "bg-yellow-500",
  completed: "bg-green-500",
};

export default function FeatureCard({ id, title, description, votes, status, onVote }: FeatureCardProps) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FEATURE",
    item: { id, status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Card
        ref={drag}
        className="p-4 cursor-move hover:border-primary/50 transition-colors"
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{title}</h3>
          <Badge className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVote(id)}
            className="flex items-center gap-2"
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{votes}</span>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}