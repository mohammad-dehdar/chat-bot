"use client";

import { env } from "@/config/env";
import { bToA } from "@/utils/base64";
import { storage } from "@/lib/storage/storage";
import { ApiError, NetworkError } from "./errors";
import type { ApiResponse, RequestConfig } from "./types";

function normalizeDataInfo(
  input?: Record<string, unknown>
): Record<string, unknown> {
  if (!input) return {};
  const dataInfo = { ...input };

  // Remove "file_" prefix from oi if present
  const oi = dataInfo.oi;
  if (typeof oi === "string" && oi.startsWith("file_")) {
    dataInfo.oi = oi.replace(/^file_/, "");
  }

  return dataInfo;
}

function buildFormData(
  config: RequestConfig,
  normalized: Record<string, unknown>
): FormData {
  const formData = new FormData();

  // Handle file_* keys
  for (const key of Object.keys(normalized)) {
    if (key.startsWith("file_")) {
      const fileValue = normalized[key] as File | Blob | null | undefined;
      if (fileValue != null) {
        formData.append(key, fileValue as Blob);
      }
      const originalKey = key.replace(/^file_/, "");
      delete normalized[originalKey];
      normalized[key] = null;
    }
  }

  // Get token (prefer explicit, fallback to storage)
  const token = config.token ?? storage.get("token") ?? "";

  // Encode dataInfo
  const detailBase64 = bToA(normalized);

  formData.append("detail", detailBase64);
  formData.append("jobId", String(config.jobId));
  formData.append("token", token);

  // Optional GWT
  const gwtFromWindow =
    typeof window !== "undefined"
      ? (window as { GWT?: string }).GWT
      : undefined;
  const gwtToSend = config.gwt ?? gwtFromWindow ?? env.GWT;
  if (gwtToSend != null) {
    formData.append("gwt", gwtToSend);
  }

  return formData;
}

function getApiEndpoint(): string {
  const base = env.API_URL.replace(/\/+$/, "");
  return /\/EGW\/?$/.test(base)
    ? `${base.replace(/\/+$/, "")}/`
    : `${base}/EGW/`;
}

export async function apiRequest<T = unknown>(
  config: RequestConfig
): Promise<ApiResponse<T>> {
  const normalized = normalizeDataInfo(config.dataInfo);
  const formData = buildFormData(config, normalized);
  const endpoint = getApiEndpoint();

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
      signal: config.signal,
    });

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        response.status
      );
    }

    const data = (await response.json()) as ApiResponse<T>;
    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error) {
      throw new NetworkError(error.message);
    }
    throw new NetworkError("Unknown error occurred");
  }
}

// Legacy compatibility
export const request = apiRequest;
