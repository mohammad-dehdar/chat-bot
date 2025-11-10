import axios, { type AxiosError, type AxiosResponse } from "axios";
import { getBaseURL } from "@/config/config";
import { bToA } from "@/utils/helpers";

declare const GWT: string;

const isBrowser = typeof window !== "undefined";

export interface RequestParams {
  jobId: number;
  dataInfo?: Record<string, unknown>;
  retries?: number;
}

export interface ApiResponse {
  error: boolean;
  data?: unknown;
  message?: string;
  token?: string;
}

async function retryRequest<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) {
      throw error;
    }

    if (axios.isAxiosError(error) && !error.response) {
      await new Promise((resolve) => setTimeout(resolve, delay));
      return retryRequest(fn, retries - 1, delay * 2);
    }

    throw error;
  }
}

export const request = async ({
  jobId,
  dataInfo = {},
  retries = 3,
}: RequestParams): Promise<ApiResponse> => {
  if (!isBrowser) {
    return {
      error: true,
      message: "Request can only be made in a browser environment.",
    };
  }

  try {
    if (!jobId || typeof jobId !== "number") {
      throw new Error("Invalid jobId");
    }

    const formData = new FormData();
    const processedDataInfo = { ...dataInfo };

    if (
      processedDataInfo.oi &&
      typeof processedDataInfo.oi === "string" &&
      processedDataInfo.oi.startsWith("file_")
    ) {
      processedDataInfo.oi = processedDataInfo.oi.replace(/^file_/, "");
    }

    for (const key in processedDataInfo) {
      if (!Object.prototype.hasOwnProperty.call(processedDataInfo, key)) {
        continue;
      }

      if (key.startsWith("file_")) {
        const originalFileKey = key.replace("file_", "");
        const file = processedDataInfo[key];

        if (file instanceof File || file instanceof Blob) {
          formData.append(key, file);
          delete processedDataInfo[originalFileKey];
          processedDataInfo[key] = null;
        }
      }
    }

    const token = window.localStorage.getItem("token");
    if (!token) {
      return {
        error: true,
        message: "No authentication token found.",
      };
    }

    const detailBase64 = bToA(processedDataInfo);

    formData.append("detail", detailBase64);
    formData.append("jobId", `${jobId}`);
    formData.append("token", token);
    formData.append("gwt", GWT);

    const response: AxiosResponse<ApiResponse> = await retryRequest(
      () =>
        axios({
          method: "POST",
          url: getBaseURL(),
          data: formData,
          headers: {
            Accept: "application/json, text/plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
          timeout: 30000,
        }),
      retries
    );

    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Request error:", error);
    }

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;

      if (axiosError.response) {
        return {
          error: true,
          message: axiosError.response.data?.message || "Server error",
          data: axiosError.response.data?.data,
        };
      }

      if (axiosError.request) {
        return {
          error: true,
          message: "Network error. Please check your connection.",
        };
      }
    }

    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const createCancelableRequest = () => {
  const controller = new AbortController();

  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};
