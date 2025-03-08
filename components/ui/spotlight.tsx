'use client'

import { cn } from "@/lib/utils"
import { useRef, useState, useEffect } from "react"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({
  className = "",
  fill = "white"
}: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "h-full w-full absolute top-0 left-0 overflow-hidden",
        className
      )}
    >
      <div
        className="absolute pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fill}15, transparent 40%)`,
          transform: "translate(-50%, -50%)",
          left: position.x,
          top: position.y,
          width: "100%",
          height: "100%",
          opacity,
          transition: "opacity 0.3s",
        }}
      />
    </div>
  )
}
