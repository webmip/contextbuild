import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CONTEXTBUILD - Create Context Documents for AI Coding",
  description: "The generation of apps with AI engines is the future, but without a suitable context the cost is exponential. Generate your context for free.",
  metadataBase: new URL('https://contextbuild.com'),
  keywords: ["AI coding", "context documents", "AI development", "prompt engineering", "AI tools", "coding assistant"],
  authors: [{ name: "CONTEXTBUILD Team" }],
  creator: "CONTEXTBUILD",
  publisher: "CONTEXTBUILD",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://contextbuild.com",
    title: "CONTEXTBUILD - AI Context Documents Generator",
    description: "Create comprehensive context documents for AI coding assistants to build your apps with minimal hallucinations.",
    siteName: "CONTEXTBUILD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CONTEXTBUILD - AI Context Documents Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTEXTBUILD - AI Context Documents Generator",
    description: "Create comprehensive context documents for AI coding assistants to build your apps with minimal hallucinations.",
    creator: "@contextbuild",
    images: ["/twitter-image.png"]
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
          {children}
          <Analytics />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}