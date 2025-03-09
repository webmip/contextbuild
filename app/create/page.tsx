"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, ArrowRight, Download, FileText, Save, AlertCircle, Loader2 } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { generateAIDocuments } from "@/lib/ai-generation"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

type Step = {
  id: string
  title: string
  description: string
  fields: {
    id: string
    label: string
    type: "text" | "textarea" | "select" | "password" | "switch" | "multiselect"
    placeholder?: string
    options?: { value: string; label: string }[]
    description?: string
    allowCustom?: boolean
  }[]
}

const steps: Step[] = [
  {
    id: "project-basics",
    title: "Project Basics",
    description: "Let's start with the fundamental details of your project",
    fields: [
      {
        id: "projectName",
        label: "Project Name",
        type: "text",
        placeholder: "e.g., Task Management App",
      },
      {
        id: "projectDescription",
        label: "Project Description",
        type: "textarea",
        placeholder: "Briefly describe what your project does and its main purpose...",
      },
      {
        id: "targetAudience",
        label: "Target Audience",
        type: "multiselect",
        placeholder: "Who will use your application?",
        options: [
          { value: "developers", label: "Developers" },
          { value: "designers", label: "Designers" },
          { value: "business-users", label: "Business Users" },
          { value: "general-consumers", label: "General Consumers" },
          { value: "enterprise", label: "Enterprise" },
          { value: "students", label: "Students" },
          { value: "educators", label: "Educators" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
    ],
  },
  {
    id: "user-flow",
    title: "User Flow",
    description: "Describe how users will interact with your application",
    fields: [
      {
        id: "userJourney",
        label: "User Journey",
        type: "textarea",
        placeholder: "Describe step-by-step how a user navigates through your app, from landing page to other pages...",
      },
      {
        id: "keyInteractions",
        label: "Key Interactions",
        type: "multiselect",
        placeholder: "Select the main actions users will take in your app",
        options: [
          { value: "login-signup", label: "Login/Signup" },
          { value: "search", label: "Search" },
          { value: "create-content", label: "Create Content" },
          { value: "edit-content", label: "Edit Content" },
          { value: "delete-content", label: "Delete Content" },
          { value: "share-content", label: "Share Content" },
          { value: "filter-sort", label: "Filter/Sort" },
          { value: "notifications", label: "Receive Notifications" },
          { value: "payments", label: "Make Payments" },
          { value: "user-profile", label: "Manage User Profile" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
    ],
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    description: "Define the technologies you'll use to build your project",
    fields: [
      {
        id: "frontend",
        label: "Frontend Technologies",
        type: "multiselect",
        placeholder: "Select frontend frameworks, libraries, and tools",
        options: [
          { value: "react", label: "React" },
          { value: "next-js", label: "Next.js" },
          { value: "vue", label: "Vue.js" },
          { value: "angular", label: "Angular" },
          { value: "svelte", label: "Svelte" },
          { value: "tailwind", label: "Tailwind CSS" },
          { value: "bootstrap", label: "Bootstrap" },
          { value: "material-ui", label: "Material UI" },
          { value: "typescript", label: "TypeScript" },
          { value: "javascript", label: "JavaScript" },
          { value: "redux", label: "Redux" },
          { value: "zustand", label: "Zustand" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
      {
        id: "backend",
        label: "Backend Technologies",
        type: "multiselect",
        placeholder: "Select backend frameworks, libraries, and tools",
        options: [
          { value: "node-js", label: "Node.js" },
          { value: "express", label: "Express" },
          { value: "nest-js", label: "NestJS" },
          { value: "django", label: "Django" },
          { value: "flask", label: "Flask" },
          { value: "ruby-on-rails", label: "Ruby on Rails" },
          { value: "spring-boot", label: "Spring Boot" },
          { value: "asp-net", label: "ASP.NET" },
          { value: "laravel", label: "Laravel" },
          { value: "go", label: "Go" },
          { value: "rust", label: "Rust" },
          { value: "php", label: "PHP" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
      {
        id: "apis",
        label: "APIs & External Services",
        type: "multiselect",
        placeholder: "Select any external APIs or services you'll integrate with",
        options: [
          { value: "rest-api", label: "REST API" },
          { value: "graphql", label: "GraphQL" },
          { value: "auth0", label: "Auth0" },
          { value: "firebase", label: "Firebase" },
          { value: "aws", label: "AWS Services" },
          { value: "google-cloud", label: "Google Cloud" },
          { value: "azure", label: "Azure" },
          { value: "stripe", label: "Stripe" },
          { value: "twilio", label: "Twilio" },
          { value: "sendgrid", label: "SendGrid" },
          { value: "algolia", label: "Algolia" },
          { value: "openai", label: "OpenAI API" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
    ],
  },
  {
    id: "features",
    title: "Core Features",
    description: "List the main features and functionality of your application",
    fields: [
      {
        id: "mustHaveFeatures",
        label: "Must-Have Features",
        type: "textarea",
        placeholder: "List the essential features your app needs to function properly...",
      },
      {
        id: "niceToHaveFeatures",
        label: "Nice-to-Have Features",
        type: "textarea",
        placeholder: "List additional features that would enhance your app but aren't essential...",
      },
      {
        id: "outOfScope",
        label: "Out of Scope",
        type: "textarea",
        placeholder: "List features or functionality that are explicitly NOT included in this project...",
      },
    ],
  },
  {
    id: "design-guidelines",
    title: "Design Guidelines",
    description: "Define the visual style and UI principles for your application",
    fields: [
      {
        id: "colorPalette",
        label: "Color Palette",
        type: "multiselect",
        placeholder: "Select color themes for your application",
        options: [
          { value: "blue-gray", label: "Blue & Gray (Corporate)" },
          { value: "green-earth", label: "Green & Earth Tones (Eco/Natural)" },
          { value: "purple-pink", label: "Purple & Pink (Creative)" },
          { value: "red-orange", label: "Red & Orange (Energetic)" },
          { value: "black-white", label: "Black & White (Minimalist)" },
          { value: "pastel", label: "Pastel Colors (Soft/Friendly)" },
          { value: "dark-mode", label: "Dark Mode" },
          { value: "light-mode", label: "Light Mode" },
          { value: "high-contrast", label: "High Contrast (Accessibility)" },
        ],
        allowCustom: true,
        description: "Select all that apply or describe your custom palette",
      },
      {
        id: "typography",
        label: "Typography",
        type: "multiselect",
        placeholder: "Select typography styles for your application",
        options: [
          { value: "sans-serif", label: "Sans-serif (Modern, clean)" },
          { value: "serif", label: "Serif (Traditional, authoritative)" },
          { value: "monospace", label: "Monospace (Technical, precise)" },
          { value: "display", label: "Display fonts (Decorative, unique)" },
          { value: "system-fonts", label: "System fonts (Native look)" },
          { value: "variable-fonts", label: "Variable fonts (Responsive)" },
        ],
        allowCustom: true,
        description: "Select all that apply or describe your custom typography",
      },
      {
        id: "uiComponents",
        label: "UI Components",
        type: "multiselect",
        placeholder: "Select key UI components for your application",
        options: [
          { value: "cards", label: "Cards" },
          { value: "tables", label: "Tables" },
          { value: "forms", label: "Forms" },
          { value: "buttons", label: "Buttons" },
          { value: "modals", label: "Modals/Dialogs" },
          { value: "tabs", label: "Tabs" },
          { value: "accordions", label: "Accordions" },
          { value: "navigation", label: "Navigation menus" },
          { value: "sliders", label: "Sliders/Carousels" },
          { value: "tooltips", label: "Tooltips" },
          { value: "dropdowns", label: "Dropdowns" },
          { value: "progress", label: "Progress indicators" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
    ],
  },
  {
    id: "data-structure",
    title: "Data Structure",
    description: "Define how your data will be organized and stored",
    fields: [
      {
        id: "dataModels",
        label: "Data Models",
        type: "textarea",
        placeholder: "Describe your main data entities and their relationships...",
      },
      {
        id: "authentication",
        label: "Authentication & Authorization",
        type: "multiselect",
        placeholder: "Select authentication methods for your application",
        options: [
          { value: "email-password", label: "Email & Password" },
          { value: "social-login", label: "Social Login (Google, Facebook, etc.)" },
          { value: "sso", label: "Single Sign-On (SSO)" },
          { value: "oauth", label: "OAuth 2.0" },
          { value: "jwt", label: "JWT Tokens" },
          { value: "mfa", label: "Multi-factor Authentication" },
          { value: "rbac", label: "Role-based Access Control" },
          { value: "passwordless", label: "Passwordless (Magic links, etc.)" },
        ],
        allowCustom: true,
        description: "Select all that apply or add your own",
      },
    ],
  },
  {
    id: "ai-integration",
    title: "AI Integration (Optional)",
    description: "Enhance your documentation with AI-powered generation",
    fields: [
      {
        id: "useAI",
        label: "Use AI to enhance documentation",
        type: "switch",
        description: "Generate more comprehensive and detailed documentation using AI",
      },
      {
        id: "aiProvider",
        label: "AI Provider",
        type: "select",
        options: [
          { value: "openai", label: "OpenAI (GPT-4)" },
          { value: "anthropic", label: "Anthropic (Claude)" },
        ],
        description: "Select which AI provider to use for document generation",
      },
      {
        id: "apiKey",
        label: "API Key",
        type: "password",
        placeholder: "Enter your API key",
        description: "Your API key will only be stored in memory and will be removed after document generation",
      },
    ],
  },
  {
    id: "final-step",
    title: "Generate Documentation",
    description: "Review your information and generate your documentation",
    fields: [
      {
        id: "confirmation",
        label: "Ready to generate documentation",
        type: "textarea",
        placeholder: "Any final notes or instructions for document generation...",
      },
    ],
  },
]

const generateMarkdown = (
  title: string,
  formData: Record<string, Record<string, string>>,
  sections: { id: string; label: string }[],
  isImplementationPlan = false,
): string => {
  let markdown = `# ${title}\n\n`

  // Add project name and description if available
  if (formData["project-basics"]?.projectName) {
    markdown += `## ${formData["project-basics"].projectName}\n\n`
  }

  if (formData["project-basics"]?.projectDescription) {
    markdown += `${formData["project-basics"].projectDescription}\n\n`
  }

  // Add each section
  sections.forEach((section) => {
    const sectionData = formData[section.id]
    if (!sectionData) return

    markdown += `## ${section.label}\n\n`

    Object.entries(sectionData).forEach(([key, value]) => {
      // Only show relevant fields for this section
      const field = steps.find((s) => s.id === section.id)?.fields.find((f) => f.id === key)
      if (!field || field.type === "password" || field.type === "switch" || key === "aiProvider") return

      markdown += `### ${field.label}\n\n`
      
      // Dar formato especial a los campos multiselect
      if (field.type === "multiselect" && value) {
        const items = value.split(",").filter(item => item.trim() !== "");
        if (items.length > 0) {
          items.forEach(item => {
            markdown += `- ${item}\n`;
          });
          markdown += "\n";
        } else {
          markdown += "No information provided.\n\n";
        }
      } else {
        markdown += `${value || "No information provided."}\n\n`;
      }
    })

    // Add implementation steps for the implementation plan
    if (isImplementationPlan && section.id === "tech-stack") {
      markdown += `## Implementation Steps\n\n`

      // Generate implementation steps based on the project information
      const steps = [
        "Set up project repository and development environment",
        "Initialize project with selected frontend framework",
        "Configure build tools and development workflow",
        "Set up version control and branching strategy",
        "Create basic project structure and architecture",
        "Implement core UI components based on design guidelines",
        "Set up routing and navigation structure",
        "Implement authentication system",
        "Create database schema and models",
        "Implement API endpoints for core functionality",
      ]

      // Add more specific steps based on the project details
      if (formData["features"]?.mustHaveFeatures) {
        const features = formData["features"].mustHaveFeatures.split("\n").filter(Boolean)
        features.forEach((feature, index) => {
          steps.push(`Implement feature: ${feature.trim()}`)
        })
      }

      // Add final steps
      steps.push(
        "Implement automated testing",
        "Set up CI/CD pipeline",
        "Deploy to staging environment",
        "Conduct user acceptance testing",
        "Deploy to production",
      )

      // Format as numbered list
      steps.forEach((step, index) => {
        markdown += `${index + 1}. ${step}\n`
      })

      markdown += "\n"
    }
  })

  return markdown
}

const downloadDocument = (title: string, content: string) => {
  const filename = title.toLowerCase().replace(/\s+/g, "-") + ".md"
  const blob = new Blob([content], { type: "text/markdown" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const downloadAllDocuments = (documents: Record<string, string>, projectName: string, toast: any) => {
  // Create a zip file with JSZip
  import("jszip").then(({ default: JSZip }) => {
    const zip = new JSZip()

    Object.entries(documents).forEach(([title, content]) => {
      const filename = title.toLowerCase().replace(/\s+/g, "-") + ".md"
      zip.file(filename, content)
    })

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const filename = `${projectName.toLowerCase().replace(/\s+/g, "-")}-docs.zip`
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast({
        title: "Documents Downloaded",
        description: "All documents have been downloaded as a zip file.",
      })
    })
  })
}

const saveAsTemplate = (formData: Record<string, Record<string, string>>, toast: any) => {
  // Remove sensitive data before saving
  const templateData = { ...formData }
  if (templateData["ai-integration"]) {
    const aiIntegration = { ...templateData["ai-integration"] }
    delete aiIntegration.apiKey
    templateData["ai-integration"] = aiIntegration
  }

  const templateName = formData["project-basics"]?.projectName || "Untitled Template"
  const template = {
    name: templateName,
    data: templateData,
    createdAt: new Date().toISOString(),
  }

  // Get existing templates from localStorage
  const existingTemplatesJSON = localStorage.getItem("docTemplates")
  const existingTemplates = existingTemplatesJSON ? JSON.parse(existingTemplatesJSON) : []

  // Add new template
  existingTemplates.push(template)

  // Save back to localStorage
  localStorage.setItem("docTemplates", JSON.stringify(existingTemplates))

  toast({
    title: "Template Saved",
    description: `"${templateName}" has been saved as a template.`,
  })
}

export default function CreatePage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<Record<string, Record<string, string>>>({})
  const [activeTab, setActiveTab] = useState("form")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDocuments, setGeneratedDocuments] = useState<Record<string, string>>({})
  const [showKeyWarning, setShowKeyWarning] = useState(false)
  const [templateLoaded, setTemplateLoaded] = useState(false)
  const { toast } = useToast()

  // Initialize AI integration settings and check for selected template
  useEffect(() => {
    // Initialize AI integration settings
    if (!formData["ai-integration"]) {
      console.log("Initializing AI integration settings")
      setFormData((prev) => ({
        ...prev,
        "ai-integration": {
          useAI: "false",
          aiProvider: "openai",
          apiKey: "",
        },
      }))
    }

    // Check if there's a selected template to load
    const loadSelectedTemplate = () => {
      try {
        const selectedTemplateJSON = localStorage.getItem("selectedTemplate")

        if (selectedTemplateJSON) {
          const selectedTemplate = JSON.parse(selectedTemplateJSON)

          // Make sure we don't lose the AI integration settings
          const aiIntegration = formData["ai-integration"] || {
            useAI: "false",
            aiProvider: "openai",
            apiKey: "",
          }

          // Set the form data with the template data
          setFormData({
            ...selectedTemplate,
            "ai-integration": aiIntegration,
          })

          // Clear the selected template from localStorage
          localStorage.removeItem("selectedTemplate")

          // Set the flag to show a notification
          setTemplateLoaded(true)

          toast({
            title: "Template Loaded",
            description: "The selected template has been loaded successfully.",
          })
        }
      } catch (error) {
        console.error("Error loading selected template:", error)
      }
    }

    // Only load the template if we haven't already loaded form data
    if (Object.keys(formData).length <= 1 && !templateLoaded) {
      loadSelectedTemplate()
    }
  }, [formData, templateLoaded, toast])

  // Cleanup API key when component unmounts
  useEffect(() => {
    return () => {
      // Clear API key when leaving the page
      if (formData["ai-integration"]?.apiKey) {
        console.log("Clearing API key on unmount for security")
      }
    }
  }, [formData])

  const handleInputChange = (stepId: string, fieldId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [stepId]: {
        ...(prev[stepId] || {}),
        [fieldId]: value,
      },
    }))
  }

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Final step - generate documents
      await generateDocuments()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generateDocuments = async () => {
    setActiveTab("preview")

    const useAI = formData["ai-integration"]?.useAI === "true"
    const apiKey = formData["ai-integration"]?.apiKey
    const aiProvider = formData["ai-integration"]?.aiProvider || "openai"

    console.log("Generate Documents called with:", {
      useAI,
      hasApiKey: !!apiKey,
      aiProvider,
    })

    if (useAI && apiKey) {
      setIsGenerating(true)

      try {
        console.log("Starting AI document generation process")
        const documents = await generateAIDocuments(formData, aiProvider, apiKey)
        console.log("AI documents generated successfully:", Object.keys(documents))
        setGeneratedDocuments(documents)
        toast({
          title: "Documents Generated",
          description: "AI-enhanced documents have been successfully generated.",
        })

        // Show warning that API key will be removed
        setShowKeyWarning(true)

        // Clear API key after 5 minutes for security
        setTimeout(
          () => {
            setFormData((prev) => ({
              ...prev,
              "ai-integration": {
                ...prev["ai-integration"],
                apiKey: "",
              },
            }))
            toast({
              title: "API Key Removed",
              description: "Your API key has been removed from memory for security.",
            })
            setShowKeyWarning(false)
          },
          5 * 60 * 1000,
        ) // 5 minutes
      } catch (error) {
        console.error("Error generating documents:", error)
        toast({
          title: "Error Generating Documents",
          description: `There was an error generating your documents: ${error instanceof Error ? error.message : "Unknown error"}`,
          variant: "destructive",
        })
      } finally {
        setIsGenerating(false)
      }
    } else {
      console.log("Skipping AI generation, using form data only")
      // Si no se usa AI, simplemente continuamos sin generar documentos AI
      if (isGenerating) setIsGenerating(false)
    }
  }

  const currentStepData = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  // Define document sections
  const documentSections = {
    "Project Requirements Document (PRD)": [
      { id: "project-basics", label: "App Overview" },
      { id: "user-flow", label: "User Flow" },
      { id: "tech-stack", label: "Tech Stack & APIs" },
      { id: "features", label: "Core Features" },
    ],
    "App Flow Document": [
      { id: "user-flow", label: "User Journey" },
      { id: "features", label: "Key Interactions" },
    ],
    "Tech Stack Document": [
      { id: "tech-stack", label: "Frontend Technologies" },
      { id: "tech-stack", label: "Backend Technologies" },
      { id: "tech-stack", label: "APIs & External Services" },
    ],
    "Frontend Guidelines": [
      { id: "design-guidelines", label: "Design Principles" },
      { id: "design-guidelines", label: "Color Palette" },
      { id: "design-guidelines", label: "Typography" },
      { id: "design-guidelines", label: "UI Components" },
    ],
    "Backend Structure": [
      { id: "data-structure", label: "Data Models" },
      { id: "data-structure", label: "Authentication & Authorization" },
      { id: "tech-stack", label: "Backend Technologies" },
    ],
    "Implementation Plan": [
      { id: "project-basics", label: "Project Overview" },
      { id: "features", label: "Features Implementation" },
      { id: "tech-stack", label: "Technical Implementation" },
    ],
  }

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Logo />
          <p className="text-muted-foreground mt-2">
            Answer the questions below to generate comprehensive documentation for your AI-assisted project
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

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">
            Step {currentStep + 1} of {steps.length}: {currentStepData.title}
          </span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {showKeyWarning && (
        <Alert className="mb-6" variant="warning">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>API Key Security Notice</AlertTitle>
          <AlertDescription>
            Your API key is temporarily stored in memory and will be automatically removed after 5 minutes or when you
            leave this page.
          </AlertDescription>
        </Alert>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="form">Questionnaire</TabsTrigger>
          <TabsTrigger value="preview">Document Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>{currentStepData.title}</CardTitle>
              <CardDescription>{currentStepData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentStepData.fields.map((field) => (
                <div key={field.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={field.id} className="flex items-center">
                      {field.label}
                      {currentStepData.id === "ai-integration" && field.id === "useAI" && (
                        <span className="ml-2 inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20">
                          Recommended
                        </span>
                      )}
                    </Label>
                    {field.type === "switch" && (
                      <Switch
                        id={field.id}
                        checked={formData[currentStepData.id]?.[field.id] === "true"}
                        onCheckedChange={(checked) => {
                          const value = checked ? "true" : "false"
                          console.log(`Setting ${field.id} to ${value}`)
                          handleInputChange(currentStepData.id, field.id, value)
                        }}
                      />
                    )}
                  </div>

                  {field.description && <p className="text-sm text-muted-foreground">{field.description}</p>}

                  {/* Solo mostrar los campos de AI Provider y API Key si useAI está activado */}
                  {currentStepData.id === "ai-integration" && 
                   ((field.id === "aiProvider" || field.id === "apiKey") && 
                    formData["ai-integration"]?.useAI !== "true") ? null : (
                    <>
                      {field.type === "textarea" && (
                        <Textarea
                          id={field.id}
                          placeholder={field.placeholder}
                          rows={5}
                          value={formData[currentStepData.id]?.[field.id] || ""}
                          onChange={(e) => handleInputChange(currentStepData.id, field.id, e.target.value)}
                        />
                      )}

                      {field.type === "text" && (
                        <Input
                          id={field.id}
                          placeholder={field.placeholder}
                          value={formData[currentStepData.id]?.[field.id] || ""}
                          onChange={(e) => handleInputChange(currentStepData.id, field.id, e.target.value)}
                        />
                      )}

                      {field.type === "password" && (
                        <Input
                          id={field.id}
                          type="password"
                          placeholder={field.placeholder}
                          value={formData[currentStepData.id]?.[field.id] || ""}
                          onChange={(e) => handleInputChange(currentStepData.id, field.id, e.target.value)}
                        />
                      )}

                      {field.type === "select" && (
                        <Select
                          value={formData[currentStepData.id]?.[field.id] || ""}
                          onValueChange={(value) => handleInputChange(currentStepData.id, field.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select an option" />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}

                      {field.type === "multiselect" && (
                        <MultiSelect
                          id={field.id}
                          options={field.options || []}
                          placeholder={field.placeholder}
                          value={formData[currentStepData.id]?.[field.id] || ""}
                          allowCustom={field.allowCustom}
                          onChange={(value) => handleInputChange(currentStepData.id, field.id, value)}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}

              {currentStepData.id === "ai-integration" && (
                <>
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Security Notice</AlertTitle>
                    <AlertDescription>
                      Your API key will only be stored in memory and will be automatically removed after document
                      generation or when you leave this page.
                    </AlertDescription>
                  </Alert>

                </>
              )}

              {currentStep === steps.length - 1 && (
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Ready to Generate</AlertTitle>
                  <AlertDescription>
                    Click "Generate Documents" to create your project documentation. If you're using AI generation, this
                    may take a moment.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button onClick={handleNext} disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : currentStep < steps.length - 1 ? (
                  <>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  <>
                    Generate Documents <FileText className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="preview">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Generating AI-Enhanced Documents</h3>
              <p className="text-muted-foreground text-center max-w-md">
                This may take a minute or two as we're using AI to create comprehensive documentation based on your
                inputs.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(documentSections).map(([title, sections], index) => (
                  <DocumentPreview
                    key={index}
                    title={title}
                    formData={formData}
                    sections={sections}
                    isImplementationPlan={title === "Implementation Plan"}
                    aiGenerated={generatedDocuments[title] || ""}
                  />
                ))}
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <Button variant="outline" onClick={() => setActiveTab("form")}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Questionnaire
                </Button>
                <Button
                  onClick={() => {
                    const documents: Record<string, string> = {}

                    // Use AI-generated documents if available, otherwise generate from form data
                    Object.entries(documentSections).forEach(([title, sections]) => {
                      documents[title] =
                        generatedDocuments[title] ||
                        generateMarkdown(title, formData, sections, title === "Implementation Plan")
                    })

                    downloadAllDocuments(documents, formData["project-basics"]?.projectName || "project", toast)
                  }}
                >
                  <Download className="mr-2 h-4 w-4" /> Download All Documents
                </Button>
                <Button variant="secondary" onClick={() => saveAsTemplate(formData, toast)}>
                  <Save className="mr-2 h-4 w-4" /> Save as Template
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface DocumentPreviewProps {
  title: string
  formData: Record<string, Record<string, string>>
  sections: { id: string; label: string }[]
  isImplementationPlan?: boolean
  aiGenerated?: string
}

function DocumentPreview({
  title,
  formData,
  sections,
  isImplementationPlan = false,
  aiGenerated = "",
}: DocumentPreviewProps) {
  console.log(`Document preview for ${title}:`, {
    hasAiContent: !!aiGenerated,
    contentLength: aiGenerated?.length || 0,
  })
  const handleExport = () => {
    // Use AI-generated content if available, otherwise generate from form data
    const content = aiGenerated || generateMarkdown(title, formData, sections, isImplementationPlan)
    downloadDocument(title, content)
  }

  return (
    <Card className="h-[500px] overflow-auto">
      <CardHeader className="sticky top-0 bg-background z-10">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Button size="sm" variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
        </div>
        {aiGenerated && (
          <div className="flex items-center mt-1">
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">AI-Enhanced</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm max-w-none">
          {aiGenerated ? (
            <div className="whitespace-pre-line">{aiGenerated}</div>
          ) : (
            <>
              <h1>{formData["project-basics"]?.projectName || "Your Project"}</h1>
              <p className="text-muted-foreground">
                {formData["project-basics"]?.projectDescription || "No project description provided."}
              </p>

              {sections.map((section, index) => {
                const sectionData = formData[section.id]
                if (!sectionData) return null

                return (
                  <div key={index} className="mt-6">
                    <h2 className="text-lg font-semibold">{section.label}</h2>
                    <Separator className="my-2" />

                    {Object.entries(sectionData).map(([key, value]) => {
                      // Only show relevant fields for this section
                      const field = steps.find((s) => s.id === section.id)?.fields.find((f) => f.id === key)
                      if (!field || field.type === "password" || field.type === "switch" || key === "aiProvider")
                        return null

                      return (
                        <div key={key} className="mt-4">
                          <h3 className="text-md font-medium">{field.label}</h3>
                          <p className="whitespace-pre-line">{value || "No information provided."}</p>
                        </div>
                      )
                    })}

                    {isImplementationPlan && index === sections.length - 1 && (
                      <div className="mt-6">
                        <h3 className="text-md font-medium">Implementation Steps</h3>
                        <ol className="list-decimal pl-5 space-y-2 mt-2">
                          <li>Set up project repository and development environment</li>
                          <li>Initialize project with selected frontend framework</li>
                          <li>Configure build tools and development workflow</li>
                          <li>Set up version control and branching strategy</li>
                          <li>Create basic project structure and architecture</li>
                          <li>Implement core UI components based on design guidelines</li>
                          <li>Set up routing and navigation structure</li>
                          <li>Implement authentication system</li>
                          <li>Create database schema and models</li>
                          <li>Implement API endpoints for core functionality</li>
                          {/* This would be dynamically generated based on user input */}
                          <li>...</li>
                          <li>Implement automated testing</li>
                          <li>Set up CI/CD pipeline</li>
                          <li>Deploy to staging environment</li>
                          <li>Conduct user acceptance testing</li>
                          <li>Deploy to production</li>
                        </ol>
                      </div>
                    )}
                  </div>
                )
              })}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Ahora añadimos el componente MultiSelect para manejar la selección múltiple con opción personalizada
const MultiSelect = ({
  id,
  options,
  placeholder,
  value,
  allowCustom = false,
  onChange,
}: {
  id: string
  options: { value: string; label: string }[]
  placeholder?: string
  value: string
  allowCustom?: boolean
  onChange: (value: string) => void
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [customOption, setCustomOption] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const initializedRef = useRef(false)

  // Solo inicializar las opciones seleccionadas una vez al montar el componente
  // o cuando cambia el valor externamente
  useEffect(() => {
    if (value) {
      const selectedValues = value.split(",").filter(val => val.trim() !== "")
      setSelectedOptions(selectedValues)
    } else {
      setSelectedOptions([])
    }
    initializedRef.current = true;
  }, [value])

  const handleOptionSelect = (option: string) => {
    const newSelectedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((o) => o !== option)
      : [...selectedOptions, option];
    
    setSelectedOptions(newSelectedOptions);
    // Actualizar el valor directamente aquí para evitar el efecto adicional
    onChange(newSelectedOptions.join(","));
  }

  const handleCustomOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOption(e.target.value)
  }

  const handleAddCustomOption = () => {
    if (customOption.trim() !== "") {
      const newSelectedOptions = [...selectedOptions, customOption.trim()];
      setSelectedOptions(newSelectedOptions);
      setCustomOption("");
      inputRef.current?.focus();
      // Actualizar el valor directamente aquí para evitar el efecto adicional
      onChange(newSelectedOptions.join(","));
    }
  }

  const handleRemoveOption = (option: string) => {
    const newSelectedOptions = selectedOptions.filter((o) => o !== option);
    setSelectedOptions(newSelectedOptions);
    // Actualizar el valor directamente aquí para evitar el efecto adicional
    onChange(newSelectedOptions.join(","));
  }

  // Eliminamos este efecto que causaba el bucle infinito
  // useEffect(() => {
  //   const selectedValues = selectedOptions.join(",")
  //   onChange(selectedValues)
  // }, [selectedOptions, onChange])

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedOptions.map((option) => (
          <div key={option} className="bg-primary/10 px-2 py-1 rounded-md text-sm font-medium text-primary">
            {option}
            <button
              type="button"
              className="ml-2 text-xs text-primary hover:text-primary/80"
              onClick={() => handleRemoveOption(option)}
            >
              x
            </button>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Select
          value=""
          onValueChange={handleOptionSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={placeholder || "Select options"} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {allowCustom && (
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={customOption}
              onChange={handleCustomOptionChange}
              placeholder="Add custom option"
              className="w-full border rounded-md p-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomOption();
                }
              }}
            />
            <button 
              type="button"
              className="text-sm text-primary hover:text-primary/80" 
              onClick={handleAddCustomOption}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
