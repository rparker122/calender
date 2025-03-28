"use client"

import { Check } from "lucide-react"
import type { EventColor } from "@/types/calendar"
import { cn } from "@/lib/utils"

interface ColorPickerProps {
  colors: EventColor[]
  selectedColor: string
  onChange: (colorId: string) => void
}

export default function ColorPicker({ colors, selectedColor, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color.id}
          type="button"
          onClick={() => onChange(color.id)}
          className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center border-2",
            color.id === selectedColor ? "border-gray-900 dark:border-gray-100" : "border-transparent",
          )}
          style={{ backgroundColor: color.value }}
          aria-label={`Select ${color.name} color`}
        >
          {color.id === selectedColor && <Check className="h-3 w-3 text-white" />}
        </button>
      ))}
    </div>
  )
}

