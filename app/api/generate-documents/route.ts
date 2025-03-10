import { type NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"

// Define document types
const documentTypes = [
  "Project Requirements Document (PRD)",
  "App Flow Document",
  "Tech Stack Document",
  "Frontend Guidelines",
  "Backend Structure",
  "Implementation Plan",
]

// Generate prompts for each document type
const generatePrompt = (documentType: string, formData: any): string => {
  const projectName = formData["project-basics"]?.projectName || "Untitled Project"
  const projectDescription = formData["project-basics"]?.projectDescription || ""

  // Common project information to include in all prompts
  const projectInfo = `
Project Name: ${projectName}
Project Description: ${projectDescription}
Target Audience: ${formData["project-basics"]?.targetAudience || ""}

User Flow:
${formData["user-flow"]?.userJourney || ""}
${formData["user-flow"]?.keyInteractions || ""}

Tech Stack:
Frontend: ${formData["tech-stack"]?.frontend || ""}
Backend: ${formData["tech-stack"]?.backend || ""}
APIs & External Services: ${formData["tech-stack"]?.apis || ""}

Core Features:
Must-Have Features: ${formData["features"]?.mustHaveFeatures || ""}
Nice-to-Have Features: ${formData["features"]?.niceToHaveFeatures || ""}
Out of Scope: ${formData["features"]?.outOfScope || ""}

Design Guidelines:
Color Palette: ${formData["design-guidelines"]?.colorPalette || ""}
Typography: ${formData["design-guidelines"]?.typography || ""}
UI Components: ${formData["design-guidelines"]?.uiComponents || ""}

Data Structure:
Data Models: ${formData["data-structure"]?.dataModels || ""}
Authentication & Authorization: ${formData["data-structure"]?.authentication || ""}
`

  // Document-specific prompts
  switch (documentType) {
    case "Project Requirements Document (PRD)":
      return `You are a professional technical writer creating a Project Requirements Document (PRD) for a software project. 
      
Create a comprehensive PRD in Markdown format for the following project:

${projectInfo}

Your PRD should include the following sections:
1. Project Overview - A detailed description of the project, its purpose, and goals
2. In-Scope vs. Out-of-Scope - Clearly define what is included and excluded from the project
3. User Flow - Describe how users will interact with the application
4. Core Features - List and explain all the essential features
5. Tech Stack & Tools - Detail the technologies and tools that will be used
6. Non-Functional Requirements - Include performance, security, and accessibility requirements
7. Constraints & Assumptions - List any limitations or assumptions made
8. Known Issues & Potential Pitfalls - Identify potential challenges

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    case "App Flow Document":
      return `You are a professional UX designer creating an App Flow Document for a software project.

Create a comprehensive App Flow Document in Markdown format for the following project:

${projectInfo}

Your App Flow Document should include the following sections:
1. Introduction - Brief overview of the application and its purpose
2. Onboarding and Sign-In/Sign-Up - How users get started with the app
3. Main Dashboard or Home Page - Description of the main landing page
4. Detailed Feature Flows and Page Transitions - Step-by-step description of how users navigate through key features
5. Settings and Account Management - How users manage their preferences and account
6. Error States and Alternate Paths - How the app handles errors and edge cases
7. Conclusion and Overall App Journey - Summary of the user's journey through the app

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    case "Tech Stack Document":
      return `You are a professional software architect creating a Tech Stack Document for a software project.

Create a comprehensive Tech Stack Document in Markdown format for the following project:

${projectInfo}

Your Tech Stack Document should include the following sections:
1. Introduction - Brief overview of the technical approach
2. Frontend Technologies - Detailed explanation of frontend frameworks, libraries, and tools
3. Backend Technologies - Detailed explanation of backend frameworks, libraries, and tools
4. Database and Data Storage - Description of database technologies and data storage solutions
5. APIs and Integrations - List of external APIs and services and how they'll be integrated
6. Development Tools and Environment - Description of development tools, IDEs, and environment setup
7. Deployment and DevOps - Explanation of deployment strategy and DevOps practices
8. Security Considerations - Overview of security measures and best practices
9. Performance Optimization - Strategies for ensuring optimal performance
10. Conclusion - Summary of the tech stack and its benefits for the project

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    case "Frontend Guidelines":
      return `You are a professional frontend developer creating Frontend Guidelines for a software project.

Create comprehensive Frontend Guidelines in Markdown format for the following project:

${projectInfo}

Your Frontend Guidelines should include the following sections:
1. Introduction - Brief overview of the frontend approach and goals
2. Frontend Architecture - Description of the frontend architecture and organization
3. Design Principles - Key design principles that guide the frontend development
4. Styling and Theming - Guidelines for CSS, styling methodology, and theming
5. Component Structure - How components should be organized and structured
6. State Management - Approach to managing state across the application
7. Routing and Navigation - How routing and navigation should be implemented
8. Performance Optimization - Strategies for ensuring optimal frontend performance
9. Testing and Quality Assurance - Guidelines for testing frontend components
10. Conclusion - Summary of the frontend guidelines

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    case "Backend Structure":
      return `You are a professional backend developer creating a Backend Structure Document for a software project.

Create a comprehensive Backend Structure Document in Markdown format for the following project:

${projectInfo}

Your Backend Structure Document should include the following sections:
1. Introduction - Brief overview of the backend approach and goals
2. Backend Architecture - Description of the overall backend architecture
3. Database Management - Details about database design, schema, and management
4. API Design and Endpoints - Description of API structure and key endpoints
5. Hosting Solutions - Information about where and how the backend will be hosted
6. Infrastructure Components - Details about servers, services, and other infrastructure
7. Security Measures - Overview of security implementations and best practices
8. Monitoring and Maintenance - Strategies for monitoring and maintaining the backend
9. Conclusion - Summary of the backend structure

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    case "Implementation Plan":
      return `You are a professional project manager creating an Implementation Plan for a software project.

Create a comprehensive Implementation Plan in Markdown format for the following project:

${projectInfo}

Your Implementation Plan should include the following sections:
1. Introduction - Brief overview of the implementation approach
2. Project Timeline - High-level timeline with major milestones
3. Phase 1: Setup and Foundation - Initial setup tasks and foundational work
4. Phase 2: Core Feature Development - Implementation of core features
5. Phase 3: Integration and Testing - Integration of components and testing procedures
6. Phase 4: Refinement and Optimization - Performance optimization and refinement
7. Phase 5: Deployment and Launch - Deployment strategy and launch plan
8. Risk Management - Identification of potential risks and mitigation strategies
9. Resource Allocation - Overview of required resources and their allocation
10. Success Criteria - Metrics for measuring successful implementation
11. Conclusion - Summary of the implementation plan

Include at least 50 specific implementation steps across all phases, with clear, actionable items.

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`

    default:
      return `Create a comprehensive document about ${documentType} for the following project:

${projectInfo}

Format your response as a well-structured Markdown document with proper headings, bullet points, and paragraphs. Be comprehensive but concise.`
  }
}

// Usar fetch directamente para OpenAI en lugar del SDK
const generateWithOpenAI = async (formData: any, apiKey: string): Promise<Record<string, string>> => {
  try {
    console.log("Generating documents with OpenAI API directly")

    // Verificar que la API key sea válida
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("Invalid API key provided")
    }

    const documents: Record<string, string> = {}

    // Generate each document in parallel
    await Promise.all(
      documentTypes.map(async (docType) => {
        try {
          console.log(`Generating ${docType} with OpenAI`)
          const prompt = generatePrompt(docType, formData)

          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey.trim()}`,
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: [
                {
                  role: "system",
                  content: "You are a professional technical writer who creates comprehensive software documentation.",
                },
                { role: "user", content: prompt },
              ],
              temperature: 0.7,
              max_tokens: 4000,
            }),
          })

          if (!response.ok) {
            let errorMessage = `OpenAI API error (${response.status}): `;
            
            try {
              const errorData = await response.json();
              console.error(`OpenAI API error for ${docType}:`, errorData);
              errorMessage += errorData.error?.message || "Unknown error";
            } catch (parseError) {
              console.error(`Failed to parse OpenAI error response for ${docType}:`, parseError);
              try {
                const errorText = await response.text();
                errorMessage += errorText || "Unknown error (could not parse response)";
              } catch (textError) {
                errorMessage += "Unknown error (could not read response)";
              }
            }
            
            throw new Error(errorMessage);
          }

          const data = await response.json()
          documents[docType] = data.choices[0]?.message?.content || ""
          console.log(`Successfully generated ${docType}, length: ${documents[docType].length}`)
        } catch (error) {
          console.error(`Error generating ${docType}:`, error)
          throw error
        }
      }),
    )

    return documents
  } catch (error) {
    console.error("Error in generateWithOpenAI:", error)
    throw error
  }
}

// Función para Anthropic
const generateWithAnthropic = async (formData: any, apiKey: string): Promise<Record<string, string>> => {
  try {
    console.log("Creating Anthropic client with API key length:", apiKey?.length || 0)

    // Verificar que la API key sea válida
    if (!apiKey || typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("Invalid API key provided")
    }

    // Anthropic no tiene la misma restricción, pero podríamos necesitar ajustes similares
    const anthropic = new Anthropic({ apiKey: apiKey.trim() })
    const documents: Record<string, string> = {}

    // Generate each document in parallel
    await Promise.all(
      documentTypes.map(async (docType) => {
        try {
          console.log(`Generating ${docType} with Anthropic`)
          const prompt = generatePrompt(docType, formData)

          const response = await anthropic.messages.create({
            model: "claude-3-sonnet-20240229",
            max_tokens: 4000,
            system: "You are a professional technical writer who creates comprehensive software documentation.",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
          })

          documents[docType] = response.content[0]?.text || ""
          console.log(`Successfully generated ${docType}, length: ${documents[docType].length}`)
        } catch (error) {
          console.error(`Error generating ${docType}:`, error)
          throw error
        }
      }),
    )

    return documents
  } catch (error) {
    console.error("Error in generateWithAnthropic:", error)
    throw error
  }
}

// Mejoremos el manejo de errores en la API route

export async function POST(request: NextRequest) {
  try {
    console.log("API route called: /api/generate-documents")
    
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("Failed to parse request body:", parseError);
      return NextResponse.json(
        { error: "Invalid request: Could not parse JSON body" },
        { status: 400 }
      );
    }
    
    const { formData, provider, apiKey } = body;

    if (!formData) {
      return NextResponse.json({ error: "Form data is required" }, { status: 400 });
    }

    if (!provider) {
      return NextResponse.json({ error: "AI provider is required" }, { status: 400 });
    }

    if (!apiKey) {
      console.error("API key missing in request")
      return NextResponse.json({ error: "API key is required for AI document generation" }, { status: 400 })
    }

    console.log(`Processing request with provider: ${provider}`)

    let documents
    if (provider === "openai") {
      documents = await generateWithOpenAI(formData, apiKey)
    } else if (provider === "anthropic") {
      documents = await generateWithAnthropic(formData, apiKey)
    } else {
      console.error(`Unsupported provider: ${provider}`)
      return NextResponse.json({ error: `Unsupported AI provider: ${provider}` }, { status: 400 })
    }

    if (!documents || Object.keys(documents).length === 0) {
      return NextResponse.json(
        { error: "No documents were generated" },
        { status: 500 }
      );
    }

    console.log("Documents generated successfully:", Object.keys(documents))
    return NextResponse.json({ documents })
  } catch (error: any) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      { 
        error: error.message || "An error occurred during document generation",
        details: error.stack ? error.stack.split('\n').slice(0, 3).join('\n') : undefined
      },
      { status: 500 },
    )
  }
}
