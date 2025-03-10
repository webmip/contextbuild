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
      // Mejorar el manejo de errores para evitar problemas de parsing
      let errorMessage = `API request failed with status ${response.status}`
      
      try {
        const errorData = await response.json()
        console.error("API error response:", errorData)
        if (errorData && errorData.error) {
          errorMessage = errorData.error
        }
      } catch (parseError) {
        console.error("Failed to parse error response:", parseError)
        // Si no podemos analizar la respuesta JSON, intentamos obtener el texto
        try {
          const errorText = await response.text()
          if (errorText) {
            errorMessage = `API error: ${errorText.substring(0, 200)}...`
          }
        } catch (textError) {
          console.error("Failed to get error text:", textError)
        }
      }
      
      throw new Error(errorMessage)
    }

    const data = await response.json()
    console.log("API response received, document count:", Object.keys(data.documents || {}).length)
    return data.documents
  } catch (error) {
    console.error("Error in generateAIDocuments:", error)
    throw error
  }
}
