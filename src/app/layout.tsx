import type { Metadata, Viewport } from "next";
import Script from "next/script";
import type { ReactNode } from "react";
import { AppProviders } from "@/shared/ui/AppProviders";
import { iranSansX } from "@/shared/config/fonts";
import { env } from "@/shared/config/env";
import "./globals.css";

export const metadata: Metadata = {
  title: "asa-chat-bot",
  description: "گفتگوی سلامت با معماری feature-sliced",
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  userScalable: false,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      className={iranSansX.variable}
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={iranSansX.className}>
        {env.NODE_ENV === "development" && (
          <Script src="//unpkg.com/react-scan/dist/auto.global.js" strategy="afterInteractive" crossOrigin="anonymous" />
        )}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
