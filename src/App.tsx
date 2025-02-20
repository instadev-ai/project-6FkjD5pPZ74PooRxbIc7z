import { ThemeProvider } from "./components/theme-provider"
import { FeatureList } from "./components/FeatureList"
import { Header } from "./components/Header"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <FeatureList />
          </main>
        </div>
      </ThemeProvider>
    </DndProvider>
  )
}

export default App