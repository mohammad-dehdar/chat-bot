import { env } from "@/config/env";

export type RoleCode = string | null;

export interface FetchRoleResult {
  roleCode: RoleCode;
  error?: string;
}

export async function defaultFetchRole(): Promise<FetchRoleResult> {
  try {
    const response = await fetch(`${env.API_URL}/role`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return {
        roleCode: null,
        error: `Request failed with status ${response.status}`,
      };
    }

    const data = (await response.json()) as unknown;
    // Expecting { roleCode: string } or similar. Fallbacks if backend differs.
    const code =
      // @ts-expect-error runtime shape depends on backend
      (data && (data.roleCode ?? data.code ?? data["6639"])) ?? null;
    return { roleCode: typeof code === "string" ? code : null };
  } catch (error) {
    return {
      roleCode: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
