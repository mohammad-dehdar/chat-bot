"use client";

import { request } from "@/services/request";
import Cookies from "js-cookie";

export type CheckTokenOptions = {
  type: "productions" | "integration" | "development";
  authJobId: string | number;
  onResult?: (ok: boolean | string) => void;
  testToken?: string;
};

function cookieOptions() {
  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  return {
    // expires in days; keep short if you want
    expires: 1,
    sameSite: "lax" as const,
    secure: isSecure,
  };
}

export default function checkToken(options: CheckTokenOptions) {
  const { type, authJobId, onResult, testToken } = options;

  if (type === "development") {
    const devToken =
      testToken ||
      // Allow env-based configuration for local development
      process.env.NEXT_PUBLIC_DEV_TOKEN;
    if (devToken) {
      // write token to cookies (primary) and localStorage (compat)
      Cookies.set("token", devToken, cookieOptions());
      try {
        localStorage.setItem("token", devToken);
      } catch {}
      onResult?.(true);
      return;
    }
    onResult?.("Missing test token");
    return;
  }

  if (!document.referrer) {
    onResult?.(false);
    return;
  }

  window.parent.postMessage({ tip: "getToken" }, document.referrer);
  const handler = (e: MessageEvent) => {
    void handlePostMessage(e, authJobId, (ok) => {
      onResult?.(ok);
    });
    // prevent stacking multiple listeners
    window.removeEventListener("message", handler);
  };
  window.addEventListener("message", handler, false);
}

export async function handlePostMessage(
  e: MessageEvent,
  authJobId: string | number,
  callback: (ok: boolean | string) => void
) {
  const payload = e.data as { tip?: string; token?: string } | undefined;
  if (payload?.tip !== "getToken") return;

  const oToken = payload.token;
  if (!oToken) {
    callback("No token provided");
    return;
  }

  // write tokens to cookies (primary) and localStorage (compat)
  Cookies.set("oToken", oToken, cookieOptions());
  Cookies.set("token", oToken, cookieOptions());
  try {
    localStorage.setItem("oToken", oToken);
    localStorage.setItem("token", oToken);
  } catch {}

  const response = await request<{ error: boolean; data?: unknown }>({
    jobId: authJobId,
    dataInfo: { token: oToken },
  });

  if (response.error === false) {
    const userDataStr = JSON.stringify(response.data ?? {});
    // store userData in cookie (short) and localStorage (full)
    Cookies.set("userData", userDataStr, cookieOptions());
    try {
      localStorage.setItem("userData", userDataStr);
    } catch {}
    callback(true);
  } else {
    callback("Auth failed");
  }
}
