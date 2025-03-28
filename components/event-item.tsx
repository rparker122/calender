import { type CalendarEvent, EVENT_COLORS } from "@/types/calendar"
import { cn } from "@/lib/utils"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface EventItemProps {
  event: CalendarEvent
  showTime?: boolean
  detailed?: boolean
}

export default function EventItem({ event, showTime = false, detailed = false }: EventItemProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // Find the event color or use default blue
  const eventColor = EVENT_COLORS.find((c) => c.id === event.color) || EVENT_COLORS[0]

  if (detailed) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div
            className={cn(
              "p-2 rounded-md mb-1 cursor-pointer transition-colors border-l-4",
              eventColor.bgClass,
              eventColor.borderClass,
              `hover:${eventColor.bgClass.replace("bg-", "bg-")}/80`,
            )}
          >
            <div className="font-medium">{event.title}</div>
            <div className="text-xs text-muted-foreground">
              {formatTime(new Date(event.date))} - {formatTime(new Date(event.endDate))}
            </div>
            {event.description && <div className="text-sm mt-1">{event.description}</div>}
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm">
              <div className="font-medium">Time</div>
              <div>
                {new Date(event.date).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
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
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: eventColor.value }}></div>
                <span>{eventColor.name}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={cn(
            "text-xs p-1 rounded truncate cursor-pointer transition-colors border-l-2",
            eventColor.bgClass,
            eventColor.borderClass,
            `hover:${eventColor.bgClass.replace("bg-", "bg-")}/80`,
          )}
        >
          {showTime && `${formatTime(new Date(event.date))} - `}
          {event.title}
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="text-sm">
            <div className="font-medium">Time</div>
            <div>
              {new Date(event.date).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
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
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: eventColor.value }}></div>
              <span>{eventColor.name}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

