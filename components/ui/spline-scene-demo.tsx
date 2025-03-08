'use client'

import { SplineScene } from "@/components/ui/spline-scene";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { useTheme } from "next-themes"
 
export function SplineSceneBasic() {
  const { theme } = useTheme()

  return (
    <Card className={`w-full h-[500px] md:h-[600px] relative overflow-hidden border-none ${theme === 'dark' ? 'bg-background' : 'bg-white'}`}>
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill={theme === 'dark' ? 'white' : '#1a1a1a'}
      />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center order-2 md:order-1">
          <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-b from-neutral-50 to-neutral-400' : 'bg-gradient-to-b from-neutral-900 to-neutral-600'}`}>
            Help your robot
          </h1>
          <p className={`mt-3 md:mt-4 text-sm md:text-base ${theme === 'dark' ? 'text-neutral-300' : 'text-neutral-600'} max-w-lg`}>
            Teach your robot how to program! 
            <span className="hidden md:inline">The AI needs some contextual guidelines to avoid hallucinations.</span>
          </p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-64 md:h-auto order-1 md:order-2">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </Card>
  )
}
