"use client";

import { apiRequest } from "@/lib/api/client";
import { AuthError } from "@/lib/api/errors";
import { token, userData } from "./token";

export type AuthMode = "production" | "integration" | "development";

export type AuthConfig = {
  mode: AuthMode;
  authJobId: string | number;
  devToken?: string;
};

export type AuthResult = { success: true } | { success: false; error: string };

export async function authenticate(config: AuthConfig): Promise<AuthResult> {
  const { mode, authJobId, devToken } = config;

  // Development mode
  if (mode === "development") {
    const tkn =
      devToken || process.env.NEXT_PUBLIC_DEV_TOKEN || "dev-token-12345";
    token.set(tkn);
    return { success: true };
  }

  // Production/Integration mode - requires parent window
  if (!document.referrer) {
    return { success: false, error: "No parent window detected" };
  }

  return new Promise<AuthResult>((resolve) => {
    // Request token from parent
    window.parent.postMessage({ tip: "getToken" }, document.referrer);

    const handler = (e: MessageEvent) => {
      void handleAuthMessage(e, authJobId, (result) => {
        resolve(result);
      });
      window.removeEventListener("message", handler);
    };

    window.addEventListener("message", handler, false);

    // Timeout after 10 seconds
    setTimeout(() => {
      window.removeEventListener("message", handler);
      resolve({ success: false, error: "Authentication timeout" });
    }, 10000);
  });
}

async function handleAuthMessage(
  e: MessageEvent,
  authJobId: string | number,
  callback: (result: AuthResult) => void
): Promise<void> {
  const payload = e.data as { tip?: string; token?: string } | undefined;

  if (payload?.tip !== "getToken") {
    return;
  }

  const receivedToken = payload.token;
  if (!receivedToken) {
    callback({ success: false, error: "No token provided" });
    return;
  }

  // Save token temporarily
  token.set(receivedToken);

  try {
    // Validate token with backend
    const response = await apiRequest<Record<string, unknown>>({
      jobId: authJobId,
      dataInfo: { token: receivedToken },
    });

    if (response.error === false && response.data) {
      userData.set(response.data);
      callback({ success: true });
    } else {
      token.remove();
      callback({ success: false, error: "Token validation failed" });
    }
  } catch (error) {
    token.remove();
    if (error instanceof AuthError) {
      callback({ success: false, error: error.message });
    } else {
      callback({ success: false, error: "Authentication request failed" });
    }
  }
}

export function clearAuth(): void {
  token.remove();
  userData.remove();
}
