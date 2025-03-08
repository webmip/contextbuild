"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { MarkdownViewer } from "@/components/markdown-viewer"
import { Header } from "@/components/header"

export default function ExamplesPage() {
  const [viewerOpen, setViewerOpen] = useState(false)
  const [currentExample, setCurrentExample] = useState<{
    title: string;
    filename: string;
  } | null>(null)

  const examples = [
    {
      title: "E-commerce Platform",
      description:
        "Complete documentation for an online shopping platform with user accounts, product catalog, and checkout system.",
      tags: ["Next.js", "Prisma", "Stripe"],
      filename: "ecommerce-platform.md",
    },
    {
      title: "Task Management App",
      description: "Documentation for a collaborative task management application with real-time updates.",
      tags: ["React", "Firebase", "Tailwind CSS"],
      filename: "task-management-app.md",
    },
    {
      title: "Content Management System",
      description: "Documentation for a headless CMS with content modeling and API-first approach.",
      tags: ["Next.js", "GraphQL", "MongoDB"],
      filename: "content-management-system.md",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Documentation for an analytics dashboard that integrates with multiple social media platforms.",
      tags: ["Vue.js", "Express", "Chart.js"],
      filename: "social-media-dashboard.md",
    },
    {
      title: "Learning Management System",
      description:
        "Documentation for an educational platform with courses, quizzes, and student progress tracking.",
      tags: ["React", "Node.js", "PostgreSQL"],
      filename: "learning-management-system.md",
    },
    {
      title: "Healthcare Patient Portal",
      description: "Documentation for a secure patient portal with appointment scheduling and medical records.",
      tags: ["Angular", "Express", "MySQL"],
      filename: "healthcare-patient-portal.md",
    },
  ]

  const handleView = (title: string, filename: string) => {
    setCurrentExample({ title, filename })
    setViewerOpen(true)
  }

  const handleDownload = (filename: string) => {
    const link = document.createElement("a")
    link.href = `/docs/examples/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Example Documentation</h1>
            <p className="text-muted-foreground">
              Browse example documents to understand how to structure your AI project documentation
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((example, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {example.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleView(example.title, example.filename)}
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> View
                </Button>
                <Button 
                  size="sm"
                  onClick={() => handleDownload(example.filename)}
                >
                  <Download className="mr-2 h-4 w-4" /> Download
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {currentExample && (
          <MarkdownViewer
            isOpen={viewerOpen}
            onClose={() => setViewerOpen(false)}
            title={currentExample.title}
            filename={currentExample.filename}
          />
        )}
      </div>
    </div>
  )
}
