import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen, Code, FileText, Lightbulb, Sparkles } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { SplineSceneBasic } from "@/components/ui/spline-scene-demo"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="container py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Spline Scene Component */}
        <div className="w-full mb-10">
          <SplineSceneBasic />
        </div>

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Why Documentation Matters for AI Coding</h2>
            <div className="prose max-w-none">
              <p>
                AI coding assistants like Cursor, Lovable, and V0 are powerful tools that can significantly accelerate
                development. However, they work best when given clear, structured guidance. Without proper documentation,
                these tools may:
              </p>
              <ul>
                <li>Make incorrect assumptions about your project requirements</li>
                <li>Generate code that doesn't align with your vision</li>
                <li>"Hallucinate" features or implementations that aren't needed</li>
                <li>Miss critical business logic or requirements</li>
              </ul>
              <p>
                Our CONTEXTBUILD helps you create comprehensive documentation that serves as a clear roadmap for AI coding
                tools, ensuring they implement exactly what you need, without wasting time on incorrect implementations.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">The Documentation Suite</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Project Requirements Document",
                  description: "Defines the overall scope, purpose, and requirements of your project",
                  icon: <FileText className="h-5 w-5 text-primary" />,
                },
                {
                  title: "App Flow Document",
                  description: "Maps out the user journey through your application in clear, sequential steps",
                  icon: <Sparkles className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Tech Stack Document",
                  description: "Specifies all technologies, libraries, and APIs used in your project",
                  icon: <Code className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Frontend Guidelines",
                  description: "Establishes design principles, UI components, and styling standards",
                  icon: <Lightbulb className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Backend Structure",
                  description: "Defines data models, API endpoints, and server-side architecture",
                  icon: <BookOpen className="h-5 w-5 text-primary" />,
                },
                {
                  title: "Implementation Plan",
                  description: "Provides a step-by-step roadmap for building your application",
                  icon: <FileText className="h-5 w-5 text-primary" />,
                },
              ].map((doc, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      {doc.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <CardDescription className="text-sm">{doc.description}</CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">How It Works</h2>
            <div className="prose max-w-none">
              <ol>
                <li>
                  <strong>Answer Questions</strong>: Our guided questionnaire walks you through all aspects of your
                  project, from basic information to technical details.
                </li>
                <li>
                  <strong>Generate Documents</strong>: Based on your answers, we automatically generate a complete set of
                  documentation tailored to your project.
                </li>
                <li>
                  <strong>Review & Export</strong>: Review the generated documents, make any necessary adjustments, and
                  export them in your preferred format.
                </li>
                <li>
                  <strong>Use with AI Tools</strong>: Provide these documents to AI coding tools like Cursor, Lovable, or
                  V0 to guide their implementation.
                </li>
              </ol>
              <p>
                By following this process, you'll create a comprehensive set of documentation that serves as a clear
                roadmap for AI coding tools, ensuring they implement exactly what you need.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
