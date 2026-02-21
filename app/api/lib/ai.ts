const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const GROQ_API_KEY = process.env.GROQ_API_KEY || "";

export interface CallAIOptions {
  temperature?: number;
  model?: string;
}

/**
 * Calls AI provider (Gemini first, then Groq fallback).
 * Returns the raw text response or throws on failure.
 */
export async function callAI(
  systemPrompt: string,
  userPrompt: string,
  options: CallAIOptions = {}
): Promise<string> {
  const { temperature = 0.7 } = options;

  // Try Gemini first
  if (GEMINI_API_KEY) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: systemPrompt + "\n\n" + userPrompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature,
            },
          }),
        }
      );

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        if (text) return text;
      }
    } catch (e) {
      console.error("Gemini failed:", e);
    }
  }

  // Fallback to Groq
  if (GROQ_API_KEY) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const text = data?.choices?.[0]?.message?.content || "";
        if (text) return text;
      }
    } catch (e) {
      console.error("Groq failed:", e);
    }
  }

  throw new Error(
    "AI service unavailable. Please set GEMINI_API_KEY or GROQ_API_KEY in .env.local"
  );
}

/**
 * Extracts and parses JSON from AI response text.
 */
export function parseJsonResponse<T = unknown>(responseText: string): T {
  const startIdx = responseText.indexOf("{");
  const endIdx = responseText.lastIndexOf("}");
  if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
    throw new Error("AI returned invalid JSON format");
  }
  const jsonStr = responseText.substring(startIdx, endIdx + 1);
  return JSON.parse(jsonStr) as T;
}
