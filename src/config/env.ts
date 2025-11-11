const windowGwt =
  typeof window !== "undefined" ? (window as { GWT?: string }).GWT : undefined;

export const env = {
  // Runtime
  NODE_ENV: (process.env.NODE_ENV ?? "development") as
    | "development"
    | "production"
    | "test",
  CI: process.env.CI === "true",

  // App
  PROJECT_NAME:
    process.env.NEXT_PUBLIC_PROJECT_NAME ?? process.env.PROJECT_NAME ?? "app",

  // API
  BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ??
    process.env.BASE_URL ??
    "https://chat-bot.salamatehr.ir",
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ??
    process.env.API_URL ??
    "https://chat-bot.salamatehr.ir",

  // Auth
  GWT: windowGwt ?? process.env.NEXT_PUBLIC_GWT ?? process.env.GWT ?? "",

  // Dev
  DEV_TOKEN: process.env.NEXT_PUBLIC_DEV_TOKEN,
} as const;

// Type-safe env validation
export function validateEnv(): void {
  if (!env.API_URL) {
    throw new Error("API_URL is required");
  }
}
