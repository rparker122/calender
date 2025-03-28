import Calendar from "@/components/calendar"
import MovingBackground from "@/components/moving-background"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <MovingBackground />
      <div className="container mx-auto py-8 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Colorful Calendar</h1>
          <ThemeToggle />
        </div>
        <Calendar />
      </div>
    </main>
  )
}

