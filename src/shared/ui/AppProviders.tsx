"use client";

import type { ReactNode } from "react";
import { AntdProvider } from "./AntdProvider";
import { ReactQueryProvider } from "@/shared/lib/react-query";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ReactQueryProvider>
      <AntdProvider>{children}</AntdProvider>
    </ReactQueryProvider>
  );
}
