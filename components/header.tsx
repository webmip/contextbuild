'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  const pathname = usePathname()

  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav className="ml-auto flex items-center gap-4">
          <Link 
            href="/about" 
            className={`text-sm font-medium ${
              pathname === '/about' 
                ? 'text-foreground' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            About
          </Link>
          <Link
            href="/how-to-use"
            className={`text-sm font-medium ${
              pathname === '/how-to-use'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            How to Use
          </Link>
          <Link
            href="/templates"
            className={`text-sm font-medium ${
              pathname === '/templates'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Templates
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
