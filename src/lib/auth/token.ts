"use client";

import { storage } from "@/lib/storage/storage";

export const token = {
  get(): string | null {
    return storage.get("token");
  },

  set(value: string): void {
    storage.set("token", value);
    // Also set oToken for backward compatibility
    storage.set("oToken", value);
  },

  remove(): void {
    storage.remove("token");
    storage.remove("oToken");
  },

  isValid(): boolean {
    const t = this.get();
    return t != null && t.length > 0;
  },
};

export const userData = {
  get<T = Record<string, unknown>>(): T | null {
    const raw = storage.get("userData");
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  set(data: unknown): void {
    storage.set("userData", JSON.stringify(data ?? {}));
  },

  remove(): void {
    storage.remove("userData");
  },
};
