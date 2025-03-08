"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, X } from "lucide-react"

interface MarkdownViewerProps {
  isOpen: boolean
  onClose: () => void
  title: string
  filename: string
}

export function MarkdownViewer({ isOpen, onClose, title, filename }: MarkdownViewerProps) {
  const [content, setContent] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true)
      fetch(`/docs/examples/${filename}`)
        .then((response) => response.text())
        .then((text) => {
          setContent(text)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Error loading markdown file:", error)
          setContent("Error loading content. Please try again.")
          setIsLoading(false)
        })
    }
  }, [isOpen, filename])

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = `/docs/examples/${filename}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="absolute right-4 top-4 flex items-center gap-2">
          <Button size="sm" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </div>
        <DialogHeader className="pr-16 mt-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Example documentation for AI-assisted development
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-8 text-center">Loading...</div>
        ) : (
          <div className="markdown-content py-4">
            <pre className="whitespace-pre-wrap text-sm">{content}</pre>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
