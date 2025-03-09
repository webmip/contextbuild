'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Logo } from './logo'
import { ThemeToggle } from './theme-toggle'
import { Menu, X } from 'lucide-react'
import { Button } from './ui/button'

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b relative z-50">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Logo />
        
        {/* Desktop Navigation */}
        <nav className="ml-auto hidden md:flex items-center gap-4">
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

        {/* Mobile Navigation Toggle */}
        <div className="ml-auto flex items-center md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="ml-2">
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg md:hidden">
          <nav className="container flex flex-col py-4">
            <Link 
              href="/about" 
              className={`px-4 py-2 text-sm font-medium ${
                pathname === '/about' 
                  ? 'text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/how-to-use"
              className={`px-4 py-2 text-sm font-medium ${
                pathname === '/how-to-use'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              How to Use
            </Link>
            <Link
              href="/templates"
              className={`px-4 py-2 text-sm font-medium ${
                pathname === '/templates'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Templates
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
