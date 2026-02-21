const MISSING_DATA = "[MISSING_DATA]";
const COULD_NOT_DETERMINE = "[COULD_NOT_DETERMINE]";

export const USER_FACING_MESSAGES = {
  missingData: "Data not provided",
  couldNotDetermine: "Could not be determined",
};

/**
 * Recursively replaces placeholder strings in an object with user-facing messages.
 */
export function sanitizePlaceholders<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;

  if (typeof obj === "string") {
    if (obj === MISSING_DATA) return USER_FACING_MESSAGES.missingData as T;
    if (obj === COULD_NOT_DETERMINE)
      return USER_FACING_MESSAGES.couldNotDetermine as T;
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizePlaceholders(item)) as T;
  }

  if (typeof obj === "object") {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(obj)) {
      result[k] = sanitizePlaceholders(v);
    }
    return result as T;
  }

  return obj;
}
