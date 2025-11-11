"use client";

import { apiRequest } from "@/lib/api/client";
import { AuthError } from "@/lib/api/errors";
import { token, userData } from "./token";
import type { AuthConfig, AuthResult } from "./types";

type MessagePayload = { tip?: string; token?: string } | undefined;

type AuthCallback = (result: AuthResult) => void;

async function processAuthMessage(
  event: MessageEvent,
  authJobId: AuthConfig["authJobId"],
  callback: AuthCallback
): Promise<void> {
  const payload = event.data as MessagePayload;

  if (payload?.tip !== "getToken") {
    return;
  }

  const receivedToken = payload.token;
  if (!receivedToken) {
    callback({ success: false, error: "No token provided" });
    return;
  }

  token.set(receivedToken);

  try {
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

export async function authenticateWithParent(
  config: AuthConfig
): Promise<AuthResult> {
  if (!document.referrer) {
    return { success: false, error: "No parent window detected" };
  }

  return new Promise<AuthResult>((resolve) => {
    const handler = (event: MessageEvent) => {
      void processAuthMessage(event, config.authJobId, finalize);
    };

    const finalize: AuthCallback = (result) => {
      window.removeEventListener("message", handler);
      window.clearTimeout(timeoutId);
      resolve(result);
    };

    const timeoutId = window.setTimeout(() => {
      finalize({ success: false, error: "Authentication timeout" });
    }, 10000);

    window.addEventListener("message", handler, false);
    window.parent.postMessage({ tip: "getToken" }, document.referrer);
  });
}
