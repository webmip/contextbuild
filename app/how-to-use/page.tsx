import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, FileText, Download, Lightbulb, Code, Sparkles, Bot } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"

export default function HowToUsePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <div className="container py-10">

        <div className="grid gap-8">
          <section>
            <h2 className="text-2xl font-bold mb-6">Getting Started</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4 text-lg">
                  ContextBuild helps you create comprehensive documentation for AI coding assistants, 
                  saving you time and AI tokens while ensuring your projects are implemented correctly.
                </p>
                <p className="mb-4">
                  Follow these simple steps to generate perfect context documents for AI-assisted development:
                </p>
              </div>
              <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
                <img 
                  src="/projectDocs.png" 
                  alt="ContextBuild workflow illustration" 
                  className="w-full h-auto"
                  style={{ opacity: 0.85 }}
                />
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide</h2>
            <div className="grid gap-6">
              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">1. Complete the Form</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p>
                      Navigate to the "Create Documents" section and fill out the comprehensive questionnaire. This form is designed to capture all essential aspects of your project:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Project basics and overall description</li>
                      <li>User flows and key interactions</li>
                      <li>Technical stack and dependencies</li>
                      <li>Core features and requirements</li>
                      <li>UI/UX specifications</li>
                      <li>Data models and backend structure</li>
                    </ul>
                    <p className="text-muted-foreground">
                      The more detailed your responses, the better guidance your AI assistant will receive.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Bot className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">2. Add Your AI API Key (Optional but Recommended)</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p>
                      For enhanced results, you can provide your OpenAI or Claude API key. This enables ContextBuild to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Generate more specialized and detailed documentation</li>
                      <li>Create tailored implementation plans specific to your project</li>
                      <li>Provide deeper insights into technical considerations</li>
                    </ul>
                    <div className="rounded-md bg-muted p-4">
                      <p className="text-sm font-medium">
                        <Lightbulb className="inline h-4 w-4 mr-2 text-amber-500" />
                        Your API key is used only for the current session and is never stored on our servers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Download className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">3. Download Your Documentation ZIP</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p>
                      Once you've completed the form, ContextBuild will generate a comprehensive set of Markdown (.md) documents:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Project Requirements Document</li>
                      <li>App Flow Document</li>
                      <li>Tech Stack Document</li>
                      <li>Frontend Guidelines</li>
                      <li>Backend Structure</li>
                      <li>Implementation Plan</li>
                    </ul>
                    <p>
                      Review the generated documents and download them as a ZIP file. Each document is carefully structured to provide maximum context with minimal token usage.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Code className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">4. Import into Your Preferred Editor</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p>
                      Open your preferred AI-enhanced code editor:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Cursor</strong> - Optimized for AI-assisted development</li>
                      <li><strong>Windsurf</strong> - The world's first agentic IDE</li>
                      <li><strong>GitHub Copilot</strong> - AI pair programming assistant</li>
                      <li>Any other editor with AI capabilities</li>
                    </ul>
                    <p>
                      Import or open the Markdown files in your editor. These documents will provide the AI with comprehensive context about your project.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-start gap-4 pb-2">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Sparkles className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">5. Start Coding with AI Assistance</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <p>
                      With your documentation loaded, you can now begin coding with your AI assistant:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Reference the documentation when asking the AI to implement specific features</li>
                      <li>Follow the implementation plan for a step-by-step approach</li>
                      <li>Use the technical specifications to ensure consistency</li>
                    </ul>
                    <div className="rounded-md bg-muted p-4 mt-2">
                      <p className="text-sm font-medium">
                        <Lightbulb className="inline h-4 w-4 mr-2 text-amber-500" />
                        <strong>Token-Saving Tip:</strong> Our documents are structured to provide maximum context with minimal token usage, saving you money on API costs while improving AI output quality.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Best Practices</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Do:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Be as specific as possible in your form responses</li>
                        <li>Include technical constraints and preferences</li>
                        <li>Specify design patterns you want to follow</li>
                        <li>Reference the documentation when asking AI to implement features</li>
                        <li>Use the implementation plan as a roadmap</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Don't:</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Skip sections in the form - each provides valuable context</li>
                        <li>Paste entire documentation at once - reference specific sections</li>
                        <li>Assume the AI remembers context from previous sessions</li>
                        <li>Waste tokens on vague instructions when you have detailed docs</li>
                        <li>Ignore the implementation plan sequence</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className="mt-10 mb-16">
            <div className="rounded-lg border bg-card p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="mb-6 max-w-2xl mx-auto">
                Create comprehensive documentation that guides AI tools to implement your code correctly, minimizing hallucinations and maximizing productivity.
              </p>
              <Link href="/create">
                <Button size="lg" className="gap-2">
                  Create Documents <ArrowLeft className="h-4 w-4 rotate-180" />
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
