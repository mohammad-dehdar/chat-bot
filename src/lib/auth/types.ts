export type AuthMode = "production" | "integration" | "development";

export type AuthConfig = {
  mode: AuthMode;
  authJobId: string | number;
  devToken?: string;
};

export type AuthResult = { success: true } | { success: false; error: string };
