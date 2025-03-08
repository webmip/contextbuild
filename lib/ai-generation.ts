// Client-side API functions for AI document generation

/**
 * Generate AI-enhanced documents using the API route
 */
export const generateAIDocuments = async (
  formData: Record<string, Record<string, string>>,
  provider: string,
  apiKey: string,
): Promise<Record<string, string>> => {
  if (!apiKey) {
    throw new Error("API key is required for AI document generation")
  }

  try {
    console.log(`Starting AI document generation with provider: ${provider}`)

    // Verificar que la API key sea válida
    if (typeof apiKey !== "string" || apiKey.trim() === "") {
      throw new Error("Invalid API key provided")
    }

    const response = await fetch("/api/generate-documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formData,
        provider,
        apiKey: apiKey.trim(),
      }),
    })

    console.log("API response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Failed to parse error response" }))
      console.error("API error response:", errorData)
      throw new Error(errorData.error || `API request failed with status ${response.status}`)
    }

    const data = await response.json()
    console.log("API response received, document count:", Object.keys(data.documents || {}).length)
    return data.documents
  } catch (error) {
    console.error("Error in generateAIDocuments:", error)
    throw error
  }
}

