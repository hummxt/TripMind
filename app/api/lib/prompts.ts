export const LANG_MAP: Record<string, string> = {
  en: "English",
  az: "Azerbaijani",
  ru: "Russian",
};

export function getLanguageName(lang: string): string {
  return LANG_MAP[lang] || "English";
}

/**
 * Standard instructions for handling missing or unclear data in AI responses.
 * Include this in system prompts to ensure graceful degradation.
 */
export const MISSING_DATA_RULES = `
MISSING DATA HANDLING:
- If you cannot determine a value, use EXACTLY one of these placeholders:
  * "[MISSING_DATA]" - when required info was not provided by the user
  * "[COULD_NOT_DETERMINE]" - when the data could not be reasonably estimated
- NEVER invent fake data. Prefer omitting optional fields or using the placeholders above.
- For optional arrays/lists: return an empty array [] if no relevant items exist.
- Keep responses concise and visual-friendly; avoid walls of text.`;

/**
 * Builds a structured user prompt with clear key-value pairs for the AI.
 */
export function buildStructuredPrompt(
  entries: Record<string, string | number | string[] | undefined>,
  language: string
): string {
  const lines = Object.entries(entries)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `- ${k}: ${Array.isArray(v) ? v.join(", ") : v}`);

  const langName = getLanguageName(language);
  return `
USER INPUT:
${lines.join("\n")}

LANGUAGE: Respond entirely in ${langName}.`;
}
