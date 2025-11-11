import { apiRequest } from "@/lib/api/client";
import { env } from "@/config/env";

export type RoleCode = string | null;

export interface FetchRoleResult {
  roleCode: RoleCode;
  error?: string;
}

const ROLE_KEY = "6639";
const ROLE_JOB_ID = 27;
const ALLOWED_ROLE_CODES = new Set<string>(["1503128706044"]);

type RoleApiResponse = {
  data?: Record<string, unknown>;
  message?: string;
};

function normalizeRoleCode(raw: unknown): string | null {
  if (raw == null) return null;
  const value = typeof raw === "string" ? raw.trim() : String(raw).trim();
  return value.length > 0 ? value : null;
}

function validateRoleCode(raw: unknown): FetchRoleResult {
  const normalized = normalizeRoleCode(raw);
  if (!normalized) {
    return {
      roleCode: null,
      error: "کد نقش در پاسخ سرور یافت نشد",
    };
  }

  if (ALLOWED_ROLE_CODES.has(normalized)) {
    return { roleCode: normalized };
  }

  return {
    roleCode: null,
    error: "دسترسی برای این نقش مجاز نیست",
  };
}

function deriveRoleResult(response: RoleApiResponse): FetchRoleResult {
  const rawRoleCode = response.data?.[ROLE_KEY];
  const validation = validateRoleCode(rawRoleCode);

  if (validation.roleCode) {
    return validation;
  }

  return {
    roleCode: null,
    error: validation.error ?? response.message ?? "عدم دسترسی به نقش",
  };
}

export async function defaultFetchRole(): Promise<FetchRoleResult> {
  try {
    const response = await apiRequest<Record<string, unknown>>({
      jobId: ROLE_JOB_ID,
      gwt: env.GWT,
    });

    const result = deriveRoleResult(response);
    if (result.roleCode) {
      return result;
    }

    return {
      roleCode: null,
      error: result.error ?? response.message ?? "دریافت نقش ناموفق بود",
    };
  } catch (error) {
    return {
      roleCode: null,
      error:
        error instanceof Error ? error.message : "خطای نامشخص در دریافت نقش",
    };
  }
}
