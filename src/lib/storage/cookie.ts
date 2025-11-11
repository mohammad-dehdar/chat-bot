"use client";

type CookieOptions = {
  expires?: number; // days
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
  path?: string;
};

function getDefaultOptions(): CookieOptions {
  const isSecure =
    typeof window !== "undefined" && window.location.protocol === "https:";
  return {
    path: "/",
    sameSite: "lax",
    secure: isSecure,
    expires: 1,
  };
}

export const cookie = {
  get(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(
      new RegExp("(?:^|; )" + encodeURIComponent(name) + "=([^;]*)")
    );
    return match ? decodeURIComponent(match[1]) : null;
  },

  set(name: string, value: string, options?: CookieOptions): void {
    if (typeof document === "undefined") return;

    const opts = { ...getDefaultOptions(), ...options };
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(
      value
    )}`;

    if (opts.expires) {
      const date = new Date();
      date.setTime(date.getTime() + opts.expires * 24 * 60 * 60 * 1000);
      cookieString += `; Expires=${date.toUTCString()}`;
    }

    cookieString += `; Path=${opts.path}`;
    if (opts.sameSite) cookieString += `; SameSite=${opts.sameSite}`;
    if (opts.secure) cookieString += `; Secure`;

    document.cookie = cookieString;
  },

  remove(name: string): void {
    if (typeof document === "undefined") return;
    document.cookie = `${encodeURIComponent(
      name
    )}=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; Path=/`;
  },
};
