"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useState } from "react";

const defaultQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 0,
      },
    },
  });

export function ReactQueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(defaultQueryClient);
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
