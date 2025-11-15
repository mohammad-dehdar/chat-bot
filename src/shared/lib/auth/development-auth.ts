"use client";

import { env } from '@/shared/config/env';
import { token } from "./token";
import type { AuthConfig, AuthResult } from "./types";

export function resolveDevToken(config: Pick<AuthConfig, "devToken">): string | null {
  if (config.devToken && config.devToken.length > 0) {
    return config.devToken;
  }

  if (env.DEV_TOKEN && env.DEV_TOKEN.length > 0) {
    return env.DEV_TOKEN;
  }

  return null;
}

export function authenticateInDevelopment(config: AuthConfig): AuthResult {
  const devToken = resolveDevToken(config);

  if (!devToken) {
    return { success: false, error: "Development token is not configured" };
  }

  token.set(devToken);
  return { success: true };
}
