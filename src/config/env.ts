export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CI: process.env.CI || false,
  // App identity
  PROJECT_NAME:
    process.env.NEXT_PUBLIC_PROJECT_NAME || process.env.PROJECT_NAME || "app",
  // Base URL (legacy compatibility) - exposed publicly for client fetch
  BASE_URL:
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.BASE_URL ||
    "https://chat-bot.salamatehr.ir",
  // Primary API endpoint - default to BASE_URL if not explicitly set
  API_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    process.env.API_URL ||
    "https://chat-bot.salamatehr.ir",
  // Optional global token to include in FormData (legacy backend requirement)
  GWT: process.env.NEXT_PUBLIC_GWT || process.env.GWT || "",
};
