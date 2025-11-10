import axios, { type AxiosResponse, AxiosError } from "axios";
import { getBaseURL } from "@/config/config";
import { bToA } from "@/utils/helpers";

// Global constant provided by webpack DefinePlugin
declare const GWT: string;

interface RequestParams {
  jobId: number;
  dataInfo?: Record<string, unknown>;
  retries?: number; // ✅ اضافه کردن retry option
}

interface ApiResponse {
  error: boolean;
  data?: unknown;
  message?: string;
}

// ✅ تابع کمکی برای retry logic
async function retryRequest<T>(
  fn: () => Promise<T>,
  retries: number = 3,
  delay: number = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;

    // ✅ فقط برای خطاهای network retry کن
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
  try {
    const formData = new FormData();

    // ✅ Validation برای jobId
    if (!jobId || typeof jobId !== "number") {
      throw new Error("Invalid jobId");
    }

    // ✅ پردازش فایل‌ها
    const processedDataInfo = { ...dataInfo };

    // حذف پیشوند file_ از oi
    if (
      processedDataInfo.oi &&
      typeof processedDataInfo.oi === "string" &&
      processedDataInfo.oi.startsWith("file_")
    ) {
      processedDataInfo.oi = processedDataInfo.oi.replace(/^file_/, "");
    }

    // پردازش فایل‌ها
    for (const key in processedDataInfo) {
      if (key.startsWith("file_")) {
        const originalFileKey = key.replace("file_", "");

        // ✅ Validation برای فایل
        const file = processedDataInfo[key];
        if (file instanceof File || file instanceof Blob) {
          formData.append(key, file);
          delete processedDataInfo[originalFileKey];
          processedDataInfo[key] = null;
        } else {
          console.warn(`Invalid file at key: ${key}`);
        }
      }
    }

    // ✅ بررسی وجود token
    const token = localStorage.getItem("token");
    if (!token) {
      return {
        error: true,
        message: "No authentication token found",
      };
    }

    // ✅ encode کردن detail
    const detailBase64 = bToA(processedDataInfo);

    formData.append("detail", detailBase64);
    formData.append("jobId", `${jobId}`);
    formData.append("token", token);
    formData.append("gwt", GWT);

    // ✅ استفاده از retry logic
    const response: AxiosResponse<ApiResponse> = await retryRequest(
      () =>
        axios({
          method: "POST",
          url: getBaseURL(),
          data: formData,
          // اجازه بده مرورگر هدر Content-Type را با boundary تنظیم کند
          headers: {
            Accept: "application/json, text/plain, */*",
            "X-Requested-With": "XMLHttpRequest",
            "Cache-Control": "no-cache",
          },
          withCredentials: true,
          timeout: 30000, // ✅ اضافه کردن timeout
        }),
      retries
    );

    // ✅ Validation پاسخ
    if (!response.data) {
      throw new Error("Invalid response from server");
    }

    return response.data;
  } catch (error) {
    console.error("Request error:", error);

    // ✅ مدیریت بهتر خطاها
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>;

      if (axiosError.response) {
        // خطای سرور
        return {
          error: true,
          message: axiosError.response.data?.message || "Server error",
          data: axiosError.response.data?.data,
        };
      } else if (axiosError.request) {
        // خطای شبکه
        return {
          error: true,
          message: "Network error. Please check your connection.",
        };
      }
    }

    // خطای ناشناخته
    return {
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * ✅ تابع کمکی برای لغو درخواست‌ها
 */
export const createCancelableRequest = () => {
  const controller = new AbortController();

  return {
    signal: controller.signal,
    cancel: () => controller.abort(),
  };
};
