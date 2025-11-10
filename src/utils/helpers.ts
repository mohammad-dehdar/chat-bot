const isClient = typeof window !== "undefined";

export const bToA = (obj: Record<string, unknown>): string => {
  try {
    const jsonString = JSON.stringify(obj);

    if (isClient) {
      const encoder = new TextEncoder();
      const uint8Array = encoder.encode(jsonString);

      // تبدیل به base64
      let binary = "";
      uint8Array.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      return btoa(binary);
    } else {
      // ✅ استفاده از Buffer در Node.js
      return Buffer.from(jsonString, "utf-8").toString("base64");
    }
  } catch (error) {
    console.error("Error encoding object to base64:", error);
    throw new Error("Failed to encode object");
  }
};

export const aToB = (data: string): unknown => {
  try {
    if (isClient) {
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);

      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }

      const decoder = new TextDecoder("utf-8");
      const jsonString = decoder.decode(bytes);
      return JSON.parse(jsonString);
    } else {
      const jsonString = Buffer.from(data, "base64").toString("utf-8");
      return JSON.parse(jsonString);
    }
  } catch (error) {
    console.error("Error decoding base64 to object:", error);
    throw new Error("Failed to decode data");
  }
};

export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, "") // حذف script tags
    .replace(/<[^>]*>/g, "") // حذف HTML tags
    .slice(0, 1000); // محدود کردن طول
};

export const isValidJSON = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
