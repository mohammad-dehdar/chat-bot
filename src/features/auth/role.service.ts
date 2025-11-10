import { request } from "@/services/request";

export type RoleCode = string | null;

export interface FetchRoleResult {
  roleCode: RoleCode;
  error?: string;
}

export async function defaultFetchRole(): Promise<FetchRoleResult> {
  try {
    // Legacy-compatible: POST to /EGW/ with FormData { detail, jobId=27, token, gwt }
    const res = await request<{
      error?: boolean;
      data?: Record<string, unknown>;
    }>({
      jobId: 27,
    });
    if (res && (res as any).error === false) {
      const code = res.data?.["6639"];
      return {
        roleCode: typeof code === "string" ? code : String(code ?? "") || null,
      };
    }
    // If backend does not send error flag, still try to parse
    const code = res?.data?.["6639"];
    return {
      roleCode: typeof code === "string" ? code : String(code ?? "") || null,
    };
  } catch (error) {
    return {
      roleCode: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
