export const getBaseURL = (): string => {
  if (typeof window === "undefined") {
    return "https://salamatehr.ir/IGW/";
  }
  const origin = window.location.origin.includes("localhost")
    ? "https://salamatehr.ir"
    : window.location.origin.toString();
  return `${origin}/IGW/`;
};

export const getFileURL = (): string => {
  if (typeof window === "undefined") {
    return "https://salamatehr.ir/";
  }
  const origin = window.location.origin.includes("localhost")
    ? "https://salamatehr.ir"
    : window.location.origin.toString();
  return `${origin}/`;
};

export const baseURL = getBaseURL();
export const fileURL = getFileURL();
