import { apiRequest } from '@/shared/lib/api/client';
import { isApiError, ApiError } from '@/shared/lib/api/errors';

export interface FetchDataOptions {
  jobId: string | number;
  keys: string[];
  setValue: (key: string, value: unknown) => void;
}

/**
 * Fetches data from the API and sets values using the provided setValue callback.
 * @param options - Configuration object containing jobId, keys, and setValue callback
 * @throws {ApiError} When API request fails
 * @throws {Error} When data extraction fails
 */
export async function fetchData(options: FetchDataOptions): Promise<void>;
export async function fetchData(
  jobId: string | number,
  keys: string[],
  setValue: (key: string, value: unknown) => void
): Promise<void>;
export async function fetchData(
  jobIdOrOptions: string | number | FetchDataOptions,
  keys?: string[],
  setValue?: (key: string, value: unknown) => void
): Promise<void> {
  // Support both function signatures for backward compatibility
  let jobId: string | number;
  let keysArray: string[];
  let setValueFn: (key: string, value: unknown) => void;

  if (typeof jobIdOrOptions === "object") {
    ({ jobId, keys: keysArray, setValue: setValueFn } = jobIdOrOptions);
  } else {
    jobId = jobIdOrOptions;
    keysArray = keys ?? [];
    setValueFn = setValue!;
  }

  if (!keysArray || keysArray.length === 0) {
    throw new Error("Keys array cannot be empty");
  }

  try {
    const response = await apiRequest<Record<string, unknown>>({ jobId });

    if (response.error === false && response.data) {
      keysArray.forEach((key) => {
        const value = response.data?.[key];
        setValueFn(key, value);
      });
    } else {
      throw new ApiError(
        response.message || "Failed to fetch data",
        undefined,
        response
      );
    }
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }
    if (error instanceof Error) {
      throw new ApiError(error.message);
    }
    throw new ApiError("Unknown error occurred while fetching data");
  }
}
