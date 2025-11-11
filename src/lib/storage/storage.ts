"use client";

import { cookie } from "./cookie";

export const storage = {
  // Unified get: prefer cookie, fallback to localStorage
  get(key: string): string | null {
    // Try cookie first
    const fromCookie = cookie.get(key);
    if (fromCookie) return fromCookie;

    // Fallback to localStorage
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },

  // Unified set: write to both cookie and localStorage
  set(key: string, value: string): void {
    cookie.set(key, value);
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // Silent fail for localStorage
    }
  },

  // Remove from both
  remove(key: string): void {
    cookie.remove(key);
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
      // Silent fail
    }
  },
};
