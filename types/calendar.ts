export interface CalendarEvent {
  id: string
  title: string
  description: string
  date: Date
  endDate: Date
  color?: string
}

export type EventColor = {
  id: string
  name: string
  value: string
  bgClass: string
  borderClass: string
}

export const EVENT_COLORS: EventColor[] = [
  { id: "blue", name: "Blue", value: "#3b82f6", bgClass: "bg-blue-100", borderClass: "border-blue-300" },
  { id: "green", name: "Green", value: "#10b981", bgClass: "bg-green-100", borderClass: "border-green-300" },
  { id: "red", name: "Red", value: "#ef4444", bgClass: "bg-red-100", borderClass: "border-red-300" },
  { id: "yellow", name: "Yellow", value: "#f59e0b", bgClass: "bg-yellow-100", borderClass: "border-yellow-300" },
  { id: "purple", name: "Purple", value: "#8b5cf6", bgClass: "bg-purple-100", borderClass: "border-purple-300" },
  { id: "pink", name: "Pink", value: "#ec4899", bgClass: "bg-pink-100", borderClass: "border-pink-300" },
  { id: "indigo", name: "Indigo", value: "#6366f1", bgClass: "bg-indigo-100", borderClass: "border-indigo-300" },
  { id: "cyan", name: "Cyan", value: "#06b6d4", bgClass: "bg-cyan-100", borderClass: "border-cyan-300" },
]

