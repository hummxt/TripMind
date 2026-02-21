const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || "";

/**
 * Fetches a relevant image URL for a given search query.
 * Uses Unsplash if key is set, otherwise returns a placeholder.
 */
export async function getImageForQuery(
  query: string,
  width = 400,
  height = 300
): Promise<string | null> {
  if (!query?.trim()) return null;

  if (UNSPLASH_ACCESS_KEY) {
    try {
      const params = new URLSearchParams({
        query: query.trim(),
        per_page: "1",
        orientation: "landscape",
      });
      const res = await fetch(
        `https://api.unsplash.com/search/photos?${params}`,
        {
          headers: {
            Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
          },
        }
      );
      if (res.ok) {
        const data = await res.json();
        const img = data.results?.[0];
        if (img?.urls?.regular) {
          return `${img.urls.regular}&w=${width}&h=${height}&fit=crop`;
        }
      }
    } catch (e) {
      console.warn("Unsplash image fetch failed:", e);
    }
  }

  // Fallback: picsum with deterministic seed from query
  const seed = query.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
}

/**
 * Enriches an array of items with image URLs based on a key extractor.
 */
export async function enrichWithImages<T extends Record<string, unknown>>(
  items: T[],
  imageKeyExtractor: (item: T) => string,
  imageField = "image_url"
): Promise<(T & { [k: string]: string | null })[]> {
  const results: (T & { [k: string]: string | null })[] = [];

  for (const item of items) {
    const query = imageKeyExtractor(item);
    const url = query ? await getImageForQuery(query) : null;
    results.push({ ...item, [imageField]: url });
  }

  return results;
}
