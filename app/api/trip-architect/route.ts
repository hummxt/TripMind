import { NextRequest, NextResponse } from "next/server";
import { Country } from "country-state-city";
import { callAI, parseJsonResponse } from "../lib/ai";
import { buildStructuredPrompt, getLanguageName } from "../lib/prompts";
import { TRIP_ARCHITECT_SYSTEM } from "../lib/prompts-config";
import { getImageForQuery } from "../lib/images";
import { sanitizePlaceholders } from "../lib/sanitize";

function getCountryCode(countryName: string | undefined | null): string | undefined {
  if (countryName == null || typeof countryName !== "string" || !countryName.trim()) {
    return undefined;
  }
  const countries = Country.getAllCountries();
  const search = countryName.trim().toLowerCase();
  const found = countries.find((c) => c.name?.toLowerCase() === search);
  return found?.isoCode;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, language } = body;

    const knownLangs = formData.knownLanguages
      ?.map((l: { language: string; level: string }) => `${l.language} (${l.level})`)
      .join(", ") || "English (B1)";

    const continentStr = Array.isArray(formData.continent)
      ? formData.continent.join(", ")
      : formData.continent ?? "[MISSING_DATA]";

    const userPrompt = buildStructuredPrompt(
      {
        Budget: `${formData.budget ?? "[MISSING_DATA]"} USD`,
        "Selected continent(s)": continentStr,
        "Languages known": knownLangs,
      },
      language
    ) + `\nOutput language: ${getLanguageName(language)}`;

    const responseText = await callAI(TRIP_ARCHITECT_SYSTEM, userPrompt, {
      temperature: 0.8,
    });

    const raw = parseJsonResponse<{
      recommended_country: string;
      country_code?: string;
      attractions_activities: string[];
      language_analysis?: Record<string, unknown>;
      budget_advice: string;
      reasoning: string;
      visa_info?: string;
      safety_concerns?: string[];
    }>(responseText);

    const data = sanitizePlaceholders(raw);

    // Ensure country_code for flag - use AI value or lookup
    if (!data.country_code) {
      data.country_code = getCountryCode(data.recommended_country);
    }

    // Gallery: images of cultural, popular, historical places from the recommended attractions
    const attractions = data.attractions_activities || [];
    const galleryQueries = attractions.slice(0, 8).map(
      (name) => `${name} ${data.recommended_country} landmark`
    );
    const galleryImages = await Promise.all(
      galleryQueries.map((q) => getImageForQuery(q, 400, 300))
    );
    const countryImage = galleryImages[0] || await getImageForQuery(
      `${data.recommended_country} cultural landmark popular attraction`,
      800,
      400
    );

    return NextResponse.json({
      data: {
        ...data,
        image_url: countryImage,
        gallery_images: galleryImages.filter(Boolean),
        gallery_captions: attractions.slice(0, galleryImages.filter(Boolean).length),
      },
    });
  } catch (error: unknown) {
    console.error("Trip Architect API error:", error);
    const message = error instanceof Error ? error.message : "Architect analysis failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
