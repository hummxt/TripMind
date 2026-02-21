import { NextRequest, NextResponse } from "next/server";
import { callAI, parseJsonResponse } from "../lib/ai";
import { buildStructuredPrompt, getLanguageName } from "../lib/prompts";
import { FOOD_DISCOVERY_SYSTEM } from "../lib/prompts-config";
import { enrichWithImages } from "../lib/images";
import { sanitizePlaceholders } from "../lib/sanitize";

interface Recommendation {
  name: string;
  location: string;
  description: string;
  why_matches: string;
  price_range: string;
}

interface CulinarySpot {
  name: string;
  city: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, language } = body;

    const userPrompt =
      buildStructuredPrompt(
        {
          "Country or city": formData.country ?? "[MISSING_DATA]",
          "Taste preference": formData.tastes ?? "Various",
          Budget: formData.budget ?? "[MISSING_DATA]",
          "Special requirements": formData.special ?? "None",
        },
        language
      ) + `\nOutput language: ${getLanguageName(language)}`;

    const responseText = await callAI(FOOD_DISCOVERY_SYSTEM, userPrompt, {
      temperature: 0.7,
    });

    const raw = parseJsonResponse<{
      country: string;
      budget_analysis: string;
      taste_analysis: string;
      famous_culinary_spots: CulinarySpot[];
      recommendations: Recommendation[];
    }>(responseText);

    const sanitized = sanitizePlaceholders(raw);

    // Add images to recommendations
    const recsWithImages = await enrichWithImages(
      sanitized.recommendations || [],
      (r) => `${r.name} ${sanitized.country} food`,
      "image_url"
    );

    // Add images to famous spots
    const famousWithImages = await enrichWithImages(
      sanitized.famous_culinary_spots || [],
      (s) => `${s.name} ${s.city} food market`,
      "image_url"
    );

    return NextResponse.json({
      data: {
        ...sanitized,
        recommendations: recsWithImages,
        famous_culinary_spots: famousWithImages,
      },
    });
  } catch (error: unknown) {
    console.error("Food Discovery error:", error);
    const message =
      error instanceof Error ? error.message : "Food analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
