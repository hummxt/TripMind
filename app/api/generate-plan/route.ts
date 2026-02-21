import { NextRequest, NextResponse } from "next/server";
import { callAI, parseJsonResponse } from "../lib/ai";
import { getLanguageName } from "../lib/prompts";
import { GENERATE_PLAN_SYSTEM } from "../lib/prompts-config";
import { getImageForQuery, enrichWithImages } from "../lib/images";
import { sanitizePlaceholders } from "../lib/sanitize";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formData, language } = body;

    const langName = getLanguageName(language);

    let userPrompt = "";

    if (formData.type === "discovery") {
      userPrompt = `
ACT AS: Professional Travel Analyst.
COUNTRY: ${formData.to || formData.country || "[MISSING_DATA]"}
INTEREST: ${formData.interest || "Adventure"}

TASK: Provide country_overview, 7-10 best hidden gems/iconic spots, and 7-8 food recommendations.
LANGUAGE: ${langName}.`;
    } else if (formData.type === "gastro") {
      userPrompt = `
ACT AS: Budget & Culinary Architect.
DESTINATION: ${formData.to ?? "[MISSING_DATA]"}
TRAVELERS: ${formData.travelers ?? "1"}
DURATION: ${formData.duration ?? "7"} days
FOOD PREF: ${formData.foodPreference ?? "Various"}

TASK: Country overview, detailed budget breakdown, 10+ restaurants with signature dishes.
LANGUAGE: ${langName}.`;
    } else {
      userPrompt = `
ACT AS: Travel Architect.
FROM: ${formData.from || "Baku"}
TO: ${formData.to || "Europe"}
DATE: ${formData.travelDate || "Flexible"}
DURATION: ${formData.duration || "7"} days
INTERESTS: ${Array.isArray(formData.interests) ? formData.interests.join(", ") : formData.interests || "Sightseeing"}

TASK: Country overview, day-by-day itinerary, 8+ food recommendations.
LANGUAGE: ${langName}.`;
    }

    const responseText = await callAI(GENERATE_PLAN_SYSTEM, userPrompt);

    const raw = parseJsonResponse<Record<string, unknown>>(responseText);
    const plan = sanitizePlaceholders(raw);

    // Add hero image for country overview
    const country =
      (plan.recommended_destinations as { name?: string }[])?.[0]?.name ||
      (formData.to || formData.country || "travel");
    const heroImage = await getImageForQuery(`${country} travel`, 800, 400);

    // Add images to destinations
    const destinations = (plan.recommended_destinations as { name: string }[]) || [];
    const destinationsWithImages = await enrichWithImages(
      destinations,
      (d) => `${d.name} travel destination`,
      "image_url"
    );

    // Add images to attractions
    const attractions = (plan.attractions as { name: string }[]) || [];
    const attractionsWithImages = await enrichWithImages(
      attractions,
      (a) => `${a.name} landmark`,
      "image_url"
    );

    // Add images to food recommendations
    const foodRecs = (plan.food_recommendations as { restaurant: string }[]) || [];
    const foodWithImages = await enrichWithImages(
      foodRecs,
      (f) => `${f.restaurant} restaurant food`,
      "image_url"
    );

    return NextResponse.json({
      plan: {
        ...plan,
        hero_image_url: heroImage,
        recommended_destinations: destinationsWithImages,
        attractions: attractionsWithImages,
        food_recommendations: foodWithImages,
      },
    });
  } catch (error: unknown) {
    console.error("Generate plan error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate plan";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
