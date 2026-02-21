import { NextRequest, NextResponse } from "next/server";
import { Country, City } from "country-state-city";

const MAX_RESULTS = 25;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const type = searchParams.get("type") || "all"; // "countries" | "places" | "all"

    if (!q || q.length < 2) {
      return NextResponse.json({
        countries: [],
        places: [],
      });
    }

    const countries = Country.getAllCountries();
    let countryResults: { name: string; isoCode: string }[] = [];
    let placeResults: { label: string; value: string; city: string; country: string }[] = [];

    if (type === "countries" || type === "all") {
      countryResults = countries
        .filter((c) => c.name.toLowerCase().includes(q))
        .slice(0, MAX_RESULTS)
        .map((c) => ({ name: c.name, isoCode: c.isoCode }));
    }

    if (type === "places" || type === "all") {
      const allCities = City.getAllCities();
      const countryMap = new Map(countries.map((c) => [c.isoCode, c.name]));

      const matching = allCities
        .filter((city) => {
          const countryName = countryMap.get(city.countryCode) || "";
          const searchStr = `${city.name} ${countryName}`.toLowerCase();
          return searchStr.includes(q);
        })
        .slice(0, MAX_RESULTS);

      placeResults = matching.map((city) => {
        const countryName = countryMap.get(city.countryCode) || city.countryCode;
        const label = `${city.name}, ${countryName}`;
        return {
          label,
          value: label,
          city: city.name,
          country: countryName,
        };
      });
    }

    return NextResponse.json({
      countries: countryResults,
      places: placeResults,
    });
  } catch (error) {
    console.error("Places API error:", error);
    return NextResponse.json({ countries: [], places: [] }, { status: 200 });
  }
}
