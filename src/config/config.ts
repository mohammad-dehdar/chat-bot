export const getBaseURL = (): string => {
  if (typeof window === "undefined") {
    return "https://self-declaration.salamatehr.ir/EGW/";
  }
  const origin = window.location.origin.includes("localhost")
    ? "https://self-declaration.salamatehr.ir"
    : window.location.origin.toString();
  return `${origin}/EGW/`;
};

export const getFileURL = (): string => {
  if (typeof window === "undefined") {
    return "https://self-declaration.salamatehr.ir/";
  }
  const origin = window.location.origin.includes("localhost")
    ? "https://self-declaration.salamatehr.ir"
    : window.location.origin.toString();
  return `${origin}/`;
};

export const baseURL = getBaseURL();
export const fileURL = getFileURL();
