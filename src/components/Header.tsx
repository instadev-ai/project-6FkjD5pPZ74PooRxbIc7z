import { Button } from "./ui/button"
import { PlusCircle } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <div className="mr-4 flex">
          <a href="/" className="mr-6 flex items-center space-x-2">
            <span className="text-xl font-bold">FeatureHub</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <Button variant="default" size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Feature Request
          </Button>
        </div>
      </div>
    </header>
  )
}