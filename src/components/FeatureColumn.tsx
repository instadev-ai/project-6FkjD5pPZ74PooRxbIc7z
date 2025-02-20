import { useDrop } from "react-dnd";
import { motion } from "framer-motion";

interface FeatureColumn {
  status: "new" | "planned" | "in-progress" | "completed";
  title: string;
  children: React.ReactNode;
  onDrop: (itemId: string, status: string) => void;
}

const statusColors = {
  new: "border-blue-500/20",
  planned: "border-purple-500/20",
  "in-progress": "border-yellow-500/20",
  completed: "border-green-500/20",
};

export default function FeatureColumn({ status, title, children, onDrop }: FeatureColumn) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "FEATURE",
    drop: (item: { id: string }) => onDrop(item.id, status),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div
        ref={drop}
        className={`min-h-[200px] p-4 rounded-lg border-2 ${
          statusColors[status]
        } ${isOver ? "bg-primary/5" : "bg-transparent"} transition-colors`}
      >
        <div className="flex flex-col gap-4">{children}</div>
      </div>
    </motion.div>
  );
}