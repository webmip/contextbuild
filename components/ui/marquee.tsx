"use client"

import React, { useRef, useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
  speed?: number
  gradient?: boolean
}

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = false,
  speed = 30,
  gradient = false,
}: MarqueeProps) {
  const [duration, setDuration] = useState(speed)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth
      // Adjust duration based on container width for consistent speed
      setDuration(containerWidth / 50)
    }
  }, [])

  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden max-w-full [--duration:30s]",
        pauseOnHover && "group",
        className
      )}
      style={{ "--duration": `${duration}s` } as React.CSSProperties}
      ref={containerRef}
    >
      {gradient && (
        <>
          <div className="absolute left-0 top-0 z-10 h-full w-[60px] sm:w-[100px] bg-gradient-to-r from-background to-transparent" />
          <div className="absolute right-0 top-0 z-10 h-full w-[60px] sm:w-[100px] bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      
      <div
        className={cn(
          "animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4",
          reverse && "animate-marquee-reverse",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  )
}
