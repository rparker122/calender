import { useState } from "react"
import { type CalendarEvent, EVENT_COLORS } from "@/types/calendar"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface EventItemProps {
  event: CalendarEvent
  showTime?: boolean
  detailed?: boolean
}

export default function EventItem({ event, showTime = false, detailed = false }: EventItemProps) {
  const [open, setOpen] = useState(false)

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const startTime = new Date(event.date)
  const endTime = new Date(event.endDate)

  const eventColor = EVENT_COLORS.find((c) => c.id === event.color) || EVENT_COLORS[0]

  const handleClose = () => {
    // This would be called after a save or update
    setOpen(false)
  }

  const EventDialogContent = () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{event.title}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4 py-4">
        <div className="text-sm">
          <div className="font-medium">Time</div>
          <div>
            {startTime.toLocaleString()} - {endTime.toLocaleString()}
          </div>
        </div>
        {event.description && (
          <div className="text-sm">
            <div className="font-medium">Description</div>
            <div>{event.description}</div>
          </div>
        )}
        <div className="text-sm">
          <div className="font-medium">Category</div>
          <div className="flex items-center gap-2 mt-1">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: eventColor.value }}
            />
            <span>{eventColor.name}</span>
          </div>
        </div>

        {/* Optional: add save/update button */}
        <div className="pt-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleClose}
          >
            Close
          </button>
        </div>
      </div>
    </DialogContent>
  )

  if (detailed) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div
            onClick={() => setOpen(true)}
            className={cn(
              "p-2 rounded-md mb-1 cursor-pointer transition-colors border-l-4",
              eventColor.bgClass,
              eventColor.borderClass,
              `hover:${eventColor.bgClass.replace("bg-", "bg-")}/80`
            )}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-muted-foreground">
              {formatTime(startTime)} - {formatTime(endTime)}
            </div>
            {event.description && <div className="text-sm mt-1">{event.description}</div>}
          </div>
        </DialogTrigger>
        <EventDialogContent />
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          onClick={() => setOpen(true)}
          className={cn(
            "text-xs p-1 rounded truncate cursor-pointer transition-colors border-l-2",
            eventColor.bgClass,
            eventColor.borderClass,
            `hover:${eventColor.bgClass.replace("bg-", "bg-")}/80`
          )}
        >
          {showTime && `${formatTime(startTime)} - `}
          {event.title}
        </div>
      </DialogTrigger>
      <EventDialogContent />
    </Dialog>
  )
}

