"use client"

import Image from "next/image"
import { Marquee } from "@/components/ui/marquee"
import { useTheme } from "next-themes"

const LOGOS = [
  {
    name: "V0",
    logo: "/v0.svg",
  },
  {
    name: "Next.js",
    logoLight: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    logoDark: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg",
  },
  {
    name: "Claude",
    logo: "/claude.svg",
  },
  {
    name: "windsurf",
    logo: "/windsurf.webp",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Bolt.new",
    logo: "bolt.svg",
  },
  {
    name: "VSCODE",
    logo: "/code.webp",
  },
  {
    name: "Cursor",
    logo: "/cursor.webp",
  },
  {
    name: "Replit",
    logo: "/replit.svg",
  },
]

export function LogoCarousel() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <div className="py-10 bg-muted/20">
      <div className="container">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
        Use it with your favorite technologies and IDEs.
        </h2>
        <Marquee className="py-4" pauseOnHover speed={35} gradient>
          {LOGOS.map((item) => (
            <Logo 
              key={item.name} 
              name={item.name} 
              logo={item.logo || (isDark ? item.logoDark : item.logoLight) || ""} 
            />
          ))}
        </Marquee>
      </div>
    </div>
  )
}

function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-24 px-8 mx-4 rounded-md bg-background border shadow-sm transition-all hover:shadow-md">
      <div className="relative h-12 w-12 mb-2">
        <Image
          src={logo}
          alt={`${name} logo`}
          fill
          className="object-contain"
        />
      </div>
      <span className="text-sm font-medium">{name}</span>
    </div>
  )
}
