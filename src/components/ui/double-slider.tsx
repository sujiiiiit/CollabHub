"use client"

import { useState, useCallback } from 'react'
import * as Slider from '@radix-ui/react-slider'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const MAX_DAYS = 365 // Maximum number of days (approximately 1 year)

export default function JobDurationSlider() {
  const [range, setRange] = useState([30, 180]) // Default range: 1 month to 6 months

  const handleSliderChange = useCallback((newValues: number[]) => {
    setRange(newValues)
  }, [])

  const handleInputChange = useCallback((index: number, value: string) => {
    const numValue = parseInt(value, 10)
    if (!isNaN(numValue) && numValue >= 0 && numValue <= MAX_DAYS) {
      const newRange = [...range]
      newRange[index] = numValue
      if (index === 0 && numValue <= range[1]) {
        setRange(newRange)
      } else if (index === 1 && numValue >= range[0]) {
        setRange(newRange)
      }
    }
  }, [range])

  const formatDuration = (days: number) => {
    if (days < 30) {
      return `${days} day${days !== 1 ? 's' : ''}`
    } else {
      const months = Math.floor(days / 30)
      return `${months} month${months !== 1 ? 's' : ''}`
    }
  }

  return (
    <div className="w-full max-w-md mx-auto px-6 space-y-4">
      <div className="flex justify-between">
        <div className="space-y-2">
          <Label htmlFor="minDuration">Min days</Label>
          <Input
            id="minDuration"
            type="number"
            min={1}
            max={MAX_DAYS}
            value={range[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="w-24"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxDuration">Max days</Label>
          <Input
            id="maxDuration"
            type="number"
            min={1}
            max={MAX_DAYS}
            value={range[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="w-24"
          />
        </div>
      </div>
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={range}
        onValueChange={handleSliderChange}
        min={1}
        max={MAX_DAYS}
        step={1}
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-slate-900 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-slate-900 shadow-md rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Min duration"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-slate-900 shadow-md rounded-full hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          aria-label="Max duration"
        />
      </Slider.Root>
      <div className="text-sm text-gray-600">
        Range: {formatDuration(range[0])} - {formatDuration(range[1])}
      </div>
    </div>
  )
}

export { JobDurationSlider }