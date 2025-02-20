import { FeatureCard } from "./FeatureCard"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function FeatureList() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Feature Requests</h1>
        <Select defaultValue="most-voted">
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
      <div className="grid gap-4">
        <FeatureCard
          title="Dark Mode Support"
          description="Add dark mode support to improve accessibility and reduce eye strain"
          status="planned"
          votes={42}
        />
        <FeatureCard
          title="Mobile App"
          description="Create a native mobile app for iOS and Android"
          status="in-progress"
          votes={38}
        />
        <FeatureCard
          title="API Integration"
          description="Allow integration with popular third-party services"
          status="new"
          votes={25}
        />
      </div>
    </div>
  )
}