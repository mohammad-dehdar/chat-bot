const windowGwt =
  typeof window !== "undefined" ? (window as { GWT?: string }).GWT : undefined;

function cleanEnvValue(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export const env = {
  // Runtime
  NODE_ENV: (process.env.NODE_ENV ?? "development") as
    | "development"
    | "production"
    | "test",
  CI: process.env.CI === "true",

  // App
  PROJECT_NAME:
    cleanEnvValue(process.env.NEXT_PUBLIC_PROJECT_NAME) ??
    cleanEnvValue(process.env.PROJECT_NAME) ??
    "app",

  // API
  BASE_URL:
    cleanEnvValue(process.env.NEXT_PUBLIC_BASE_URL) ??
    cleanEnvValue(process.env.BASE_URL) ??
    "https://chat-bot.salamatehr.ir",
  API_URL:
    cleanEnvValue(process.env.NEXT_PUBLIC_API_URL) ??
    cleanEnvValue(process.env.API_URL) ??
    "https://chat-bot.salamatehr.ir",

  // Auth
  GWT:
    windowGwt ??
    cleanEnvValue(process.env.NEXT_PUBLIC_GWT) ??
    cleanEnvValue(process.env.GWT) ??
    "",

  // Dev
  DEV_TOKEN:
    cleanEnvValue(process.env.NEXT_PUBLIC_DEV_TOKEN) ??
    cleanEnvValue(process.env.DEV_TOKEN),
} as const;

// Type-safe env validation
export function validateEnv(): void {
  if (!env.API_URL) {
    throw new Error("API_URL is required");
  }
}
