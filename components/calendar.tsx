"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { type CalendarEvent, EVENT_COLORS } from "@/types/calendar"
import EventItem from "./event-item"
import ColorPicker from "./color-picker"

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Meeting",
      description: "Weekly team sync",
      date: new Date(new Date().setHours(10, 0, 0, 0)),
      endDate: new Date(new Date().setHours(11, 0, 0, 0)),
      color: "blue",
    },
    {
      id: "2",
      title: "Project Deadline",
      description: "Submit final deliverables",
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      color: "red",
    },
    {
      id: "3",
      title: "Lunch with Client",
      description: "Discuss new project requirements",
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      color: "green",
    },
    {
      id: "4",
      title: "Product Launch",
      description: "Release new features",
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      endDate: new Date(new Date().setDate(new Date().getDate() + 5)),
      color: "purple",
    },
  ])
  const [newEvent, setNewEvent] = useState<Omit<CalendarEvent, "id">>({
    title: "",
    description: "",
    date: new Date(),
    endDate: new Date(),
    color: "blue",
  })
  const [view, setView] = useState<"month" | "week" | "day">("month")

  // NEW: Dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  // Get day of week of first day in month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Previous month days to display
  const prevMonthDays = firstDayOfMonth === 0 ? 0 : firstDayOfMonth

  // Calendar navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Add new event
  const handleAddEvent = () => {
    const id = Math.random().toString(36).substring(2, 9)
    setEvents([...events, { ...newEvent, id }])
    setNewEvent({
      title: "",
      description: "",
      date: new Date(),
      endDate: new Date(),
      color: "blue",
    })

    // CLOSE the dialog after adding event
    setIsDialogOpen(false)
  }

  // Get events for a specific day
  const getEventsForDay = (day: number) => {
    return events.filter((event) => {
      const eventDate = new Date(event.date)
      return eventDate.getDate() === day && eventDate.getMonth() === month && eventDate.getFullYear() === year
    })
  }

  // Month names
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  // Day names
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium min-w-32 text-center">
            {monthNames[month]} {year}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={goToToday} className="ml-2">
            Today
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant={view === "month" ? "default" : "outline"} onClick={() => setView("month")} size="sm">
            Month
          </Button>
          <Button variant={view === "week" ? "default" : "outline"} onClick={() => setView("week")} size="sm">
            Week
          </Button>
          <Button variant={view === "day" ? "default" : "outline"} onClick={() => setView("day")} size="sm">
            Day
          </Button>

          {/* Controlled Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="date">Start Date & Time</Label>
                  <Input
                    id="date"
                    type="datetime-local"
                    value={newEvent.date.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        date: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date & Time</Label>
                  <Input
                    id="endDate"
                    type="datetime-local"
                    value={newEvent.endDate.toISOString().slice(0, 16)}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        endDate: new Date(e.target.value),
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Color</Label>
                  <ColorPicker
                    colors={EVENT_COLORS}
                    selectedColor={newEvent.color || "blue"}
                    onChange={(colorId) => setNewEvent({ ...newEvent, color: colorId })}
                  />
                </div>
              </div>
              <Button onClick={handleAddEvent}>Save Event</Button>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="overflow-hidden">
        {view === "month" && (
          <>
            <div className="grid grid-cols-7 bg-muted/50">
              {dayNames.map((day) => (
                <div key={day} className="p-2 text-center font-medium text-sm">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 auto-rows-fr">
              {/* Previous month days */}
              {Array.from({ length: prevMonthDays }).map((_, index) => {
                const prevMonthDay = getDaysInMonth(year, month - 1) - prevMonthDays + index + 1
                return (
                  <div
                    key={`prev-${index}`}
                    className="p-2 text-muted-foreground border border-muted/50 text-center text-sm"
                  >
                    {prevMonthDay}
                  </div>
                )
              })}

              {/* Current month days */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1
                const dayEvents = getEventsForDay(day)
                const isToday =
                  day === new Date().getDate() &&
                  month === new Date().getMonth() &&
                  year === new Date().getFullYear()
                return (
                  <div
                    key={day}
                    className={cn(
                      "border border-muted/50 p-1 flex flex-col",
                      isToday ? "bg-accent text-accent-foreground" : ""
                    )}
                  >
                    <span className="text-xs text-muted-foreground">{day}</span>
                    <div className="flex flex-col gap-1 mt-1 overflow-auto max-h-20">
                      {dayEvents.map((event) => (
                        <EventItem key={event.id} event={event} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* You can add 'week' and 'day' views here as needed */}
      </Card>
    </div>
  )
}
