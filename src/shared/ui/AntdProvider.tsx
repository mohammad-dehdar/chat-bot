"use client";

import type { ReactNode } from "react";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";

interface AntdProviderProps {
  children: ReactNode;
}

export function AntdProvider({ children }: AntdProviderProps) {
  return (
    <ConfigProvider
      direction="rtl"
      locale={faIR}
      theme={{
        token: {
          colorPrimary: "#1677ff",
          borderRadius: 12,
          fontFamily: "var(--font-iran-sans-x)",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
