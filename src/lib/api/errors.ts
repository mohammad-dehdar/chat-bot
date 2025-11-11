export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class AuthError extends ApiError {
  constructor(message: string = "Authentication failed") {
    super(message, 401);
    this.name = "AuthError";
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = "Network request failed") {
    super(message);
    this.name = "NetworkError";
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
