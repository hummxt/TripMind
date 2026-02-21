import { NextRequest, NextResponse } from "next/server";
import { callAI, parseJsonResponse } from "../lib/ai";
import { buildStructuredPrompt, getLanguageName } from "../lib/prompts";
import { SPOT_DISCOVERY_SYSTEM } from "../lib/prompts-config";
import { enrichWithImages } from "../lib/images";
import { sanitizePlaceholders } from "../lib/sanitize";

interface Spot {
  name: string;
  location: string;
  description: string;
  why_matches: string;
  activities: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, language } = body;

    const userPrompt =
      buildStructuredPrompt(
        {
          Country: formData.country ?? "[MISSING_DATA]",
          Interest: formData.interest ?? "Adventure",
        },
        language
      ) +
      `\nTask: Analyze the country and find 6-10 best spots matching the interest. Output language: ${getLanguageName(language)}`;

    const responseText = await callAI(SPOT_DISCOVERY_SYSTEM, userPrompt, {
      temperature: 0.7,
    });

    const raw = parseJsonResponse<{
      country: string;
      interest_type: string;
      country_overview: string;
      spots: Spot[];
    }>(responseText);

    const sanitized = sanitizePlaceholders(raw);

    // Add images to each spot
    const spotsWithImages = await enrichWithImages(
      sanitized.spots || [],
      (s) => `${s.name} ${s.location} landmark`,
      "image_url"
    );

    return NextResponse.json({
      data: {
        ...sanitized,
        spots: spotsWithImages,
      },
    });
  } catch (error: unknown) {
    console.error("Spot Discovery error:", error);
    const message =
      error instanceof Error ? error.message : "Discovery failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
