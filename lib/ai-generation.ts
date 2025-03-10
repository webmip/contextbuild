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

    // Configurar un timeout más largo para la petición
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 2 minutos de timeout

    try {
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
        signal: controller.signal,
      });

      clearTimeout(timeoutId); // Limpiar el timeout si la petición termina antes
      console.log("API response status:", response.status);

      // Manejar errores específicos por código de estado
      if (!response.ok) {
        // Manejar específicamente el error de timeout
        if (response.status === 504) {
          console.error("Gateway Timeout: The server took too long to respond");
          throw new Error("The AI document generation is taking too long. Please try again with a smaller project or try later when the server is less busy.");
        }
        
        // Para otros errores, intentar obtener información detallada
        let errorMessage = `API request failed with status ${response.status}`;
        
        // Solo intentamos leer el cuerpo UNA VEZ como JSON
        // Si falla, simplemente usamos el mensaje de error genérico
        try {
          const errorData = await response.json();
          console.error("API error response:", errorData);
          if (errorData && errorData.error) {
            errorMessage = errorData.error;
          }
        } catch (parseError) {
          // Si falla el parsing JSON, NO intentamos leer como texto
          // Simplemente registramos el error y continuamos con el mensaje genérico
          console.error("Failed to parse error response:", parseError);
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("API response received, document count:", Object.keys(data.documents || {}).length);
      return data.documents;
    } finally {
      clearTimeout(timeoutId); // Asegurarse de limpiar el timeout en cualquier caso
    }
  } catch (error: unknown) {
    // Manejar errores de abort específicamente
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error("Request aborted due to timeout");
        throw new Error("The AI document generation timed out. Please try again with a smaller project or try later.");
      }
      
      console.error("Error in generateAIDocuments:", error);
      throw error;
    } else {
      // Si no es un Error estándar, convertirlo a uno
      console.error("Unknown error in generateAIDocuments:", error);
      throw new Error("An unexpected error occurred during document generation");
    }
  }
}
