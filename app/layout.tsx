import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import 'antd/dist/reset.css';

import { iranSansX } from '@/shared/config/fonts/fonts';
import { env } from '@/shared/config/env';
import AppProviders from '@/shared/lib/providers/AppProviders';
import './globals.css';

export const metadata: Metadata = {
    title: 'asa-chat-bot',
    description: '',
};

export const viewport: Viewport = {
    minimumScale: 1,
    initialScale: 1,
    width: 'device-width',
    userScalable: false,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            className={`${iranSansX.variable}`}
            lang="fa"
            dir="rtl"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <body className={`antialiased ${iranSansX.className}`}>
                {env.NODE_ENV === 'development' && (
                    <Script
                        crossOrigin="anonymous"
                        src="//unpkg.com/react-scan/dist/auto.global.js"
                        strategy="afterInteractive"
                    />
                )}
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    );
}
