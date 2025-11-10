"use client";

import { env } from "@/config/env";
import { bToA } from "@/utils/base64";
import Cookies from "js-cookie";

export type RequestArgs = {
  jobId: string | number;
  dataInfo?: Record<string, unknown>;
  signal?: AbortSignal;
};

function normalizeDataInfo(
  input?: Record<string, unknown>
): Record<string, unknown> {
  if (!input) return {};
  const dataInfo: Record<string, unknown> = { ...input };

  // If oi starts with "file_", remove the prefix
  const oi = dataInfo.oi;
  if (typeof oi === "string" && oi.startsWith("file_")) {
    dataInfo.oi = oi.replace(/^file_/, "");
  }

  return dataInfo;
}

export async function request<TResponse = unknown>({
  jobId,
  dataInfo,
  signal,
}: RequestArgs): Promise<TResponse> {
  const normalized = normalizeDataInfo(dataInfo);
  const formData = new FormData();

  // Handle file_* keys: append file to FormData and null out the JSON pair
  for (const key of Object.keys(normalized)) {
    if (key.startsWith("file_")) {
      const fileValue = normalized[key] as File | Blob | null | undefined;
      if (fileValue != null) {
        formData.append(key, fileValue as Blob);
      }
      // ensure original key without file_ is removed
      const originalKey = key.replace(/^file_/, "");
      delete normalized[originalKey];
      // keep file_ key with null in JSON payload (server convention)
      normalized[key] = null;
    }
  }

  let token = "";
  if (typeof window !== "undefined") {
    // Prefer cookie token; fallback to localStorage for backward compatibility
    token = Cookies.get("token") ?? "";
    if (!token) {
      try {
        token = localStorage.getItem("token") ?? "";
      } catch {
        token = "";
      }
    }
  }
  const detailBase64 = bToA(normalized ?? {});

  formData.append("detail", detailBase64);
  formData.append("jobId", String(jobId));
  formData.append("token", token);

  // Optional global GWT if present (maintain backward compatibility)
  const maybeGwt =
    typeof window !== "undefined"
      ? (window as unknown as { GWT?: string }).GWT
      : undefined;
  const gwtToSend = maybeGwt || env.GWT;
  if (gwtToSend) {
    formData.append("gwt", gwtToSend);
  }

  const base = env.API_URL.replace(/\/+$/, "");
  const endpoint = /\/EGW\/?$/.test(base)
    ? `${base.replace(/\/+$/, "")}/`
    : `${base}/EGW/`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  // Response is expected to be JSON-serializable like old axios .data
  return (await response.json()) as TResponse;
}
