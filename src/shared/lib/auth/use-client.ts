"use client";

import { authenticateInDevelopment } from "./development-auth";
import { authenticateWithParent } from "./parent-auth";
import { token, userData } from "./token";
import type { AuthConfig, AuthResult } from "./types";

export type { AuthMode, AuthConfig, AuthResult } from "./types";

export async function authenticate(config: AuthConfig): Promise<AuthResult> {
  if (config.mode === "development") {
    return authenticateInDevelopment(config);
  }

  return authenticateWithParent(config);
}

export function clearAuth(): void {
  token.remove();
  userData.remove();
}
