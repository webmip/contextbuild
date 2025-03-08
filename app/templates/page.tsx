"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Download, FileText, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

type Template = {
  name: string
  data: Record<string, Record<string, string>>
  createdAt: string
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Load templates from localStorage
    const loadTemplates = () => {
      try {
        const templatesJSON = localStorage.getItem("docTemplates")
        const loadedTemplates = templatesJSON ? JSON.parse(templatesJSON) : []
        setTemplates(loadedTemplates)
      } catch (error) {
        console.error("Error loading templates:", error)
        toast({
          title: "Error Loading Templates",
          description: "There was an error loading your saved templates.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTemplates()
  }, [toast])

  const handleUseTemplate = (template: Template) => {
    try {
      // Store the selected template in localStorage to be loaded in the create page
      localStorage.setItem("selectedTemplate", JSON.stringify(template.data))

      // Navigate to the create page
      toast({
        title: "Template Selected",
        description: `"${template.name}" has been loaded. You can now continue editing.`,
      })

      router.push("/create")
    } catch (error) {
      console.error("Error using template:", error)
      toast({
        title: "Error Using Template",
        description: "There was an error loading the selected template.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteTemplate = (index: number, templateName: string) => {
    try {
      // Remove the template from the array
      const updatedTemplates = [...templates]
      updatedTemplates.splice(index, 1)

      // Update localStorage
      localStorage.setItem("docTemplates", JSON.stringify(updatedTemplates))

      // Update state
      setTemplates(updatedTemplates)

      toast({
        title: "Template Deleted",
        description: `"${templateName}" has been deleted.`,
      })
    } catch (error) {
      console.error("Error deleting template:", error)
      toast({
        title: "Error Deleting Template",
        description: "There was an error deleting the template.",
        variant: "destructive",
      })
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch (error) {
      return "Unknown date"
    }
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Logo />
          <p className="text-muted-foreground mt-2">
            Load a previously saved template to quickly create new documentation
          </p>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link href="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-primary/20 mb-4"></div>
            <div className="h-4 w-32 bg-muted rounded"></div>
          </div>
        </div>
      ) : templates.length === 0 ? (
        <div className="py-12">
          <Alert>
            <FileText className="h-4 w-4" />
            <AlertTitle>No Templates Found</AlertTitle>
            <AlertDescription>
              You haven&apos;t saved any templates yet. Create a new document and save it as a template to see it here.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-8">
            <Link href="/create">
              <Button>
                <FileText className="mr-2 h-4 w-4" /> Create New Document
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>Created on {formatDate(template.createdAt)}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium">Project Type:</span>
                    <span className="text-sm ml-2 text-muted-foreground">
                      {template.data["project-basics"]?.projectType || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Target Audience:</span>
                    <span className="text-sm ml-2 text-muted-foreground">
                      {template.data["project-basics"]?.targetAudience || "Not specified"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Tech Stack:</span>
                    <span className="text-sm ml-2 text-muted-foreground">
                      {template.data["tech-stack"]?.frontend
                        ? template.data["tech-stack"].frontend.split("\n")[0] + "..."
                        : "Not specified"}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm" onClick={() => handleDeleteTemplate(index, template.name)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
                <Button size="sm" onClick={() => handleUseTemplate(template)}>
                  <Download className="mr-2 h-4 w-4" /> Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

