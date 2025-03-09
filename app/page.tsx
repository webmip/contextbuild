import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"
import { Logo } from "@/components/logo"
import { ThemeToggle } from "@/components/theme-toggle"
import { LogoCarousel } from "@/components/logo-carousel"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Generate Perfect Context Documents for AI Coding
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Create comprehensive documentation that guides AI tools like Cursor, Lovable, and V0 to implement your
                  code correctly, minimizing hallucinations and maximizing productivity.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/create">
                    <Button size="lg" className="gap-2">
                      Create Documents <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/examples">
                    <Button size="lg" variant="outline" className="gap-2">
                      View Examples <FileText className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-[500px] aspect-video rounded-lg border bg-background p-4 shadow-lg">
                  <div className="space-y-3">
                    <div className="h-2.5 w-24 rounded-full bg-muted"></div>
                    <div className="h-2 w-full rounded-full bg-muted"></div>
                    <div className="h-2 w-full rounded-full bg-muted"></div>
                    <div className="h-2 w-3/4 rounded-full bg-muted"></div>
                    <div className="h-2.5 w-32 rounded-full bg-primary/70"></div>
                    <div className="h-2 w-full rounded-full bg-muted"></div>
                    <div className="h-2 w-full rounded-full bg-muted"></div>
                    <div className="h-2 w-2/3 rounded-full bg-muted"></div>
                    <div className="h-2.5 w-28 rounded-full bg-primary/70"></div>
                    <div className="h-2 w-full rounded-full bg-muted"></div>
                    <div className="h-2 w-4/5 rounded-full bg-muted"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <LogoCarousel />
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Essential Documents for AI-Assisted Development
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our tool helps you create the complete set of documents needed for effective AI collaboration
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Project Requirements Document",
                  description: "A comprehensive overview of your app, user flows, tech stack, and core features.",
                },
                {
                  title: "App Flow Document",
                  description: "A detailed map of how users navigate through your application from start to finish.",
                },
                {
                  title: "Tech Stack Document",
                  description: "Explanation of all technical components, packages, dependencies, and API integrations.",
                },
                {
                  title: "Frontend Guidelines",
                  description: "UI specifications including color palettes, fonts, icons, and design principles.",
                },
                {
                  title: "Backend Structure",
                  description: "Database schema, authentication flows, and storage configuration details.",
                },
                {
                  title: "Implementation Plan",
                  description:
                    "A detailed 50+ step plan that guides AI to implement your code with minimal hallucinations.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-2 rounded-lg border bg-background p-6 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 md:px-6">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CONTEXTBUILD. Made with ❤️ to save AI tokens.
          </p>
        </div>
      </footer>
    </div>
  )
}
