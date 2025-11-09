import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { dana, poppins } from '@/config/fonts/fonts';
import { env } from '@/config/env';
import './globals.css';

export const metadata: Metadata = {
    title: 'asa-chat-bot',
    description: '',
    viewport: {
        minimumScale: 1,
        initialScale: 1,
        width: 'device-width',
        userScalable: false,
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html
            className={` ${dana.variable} ${poppins.variable} `}
            lang="fa"
            dir="rtl"
            data-scroll-behavior="smooth"
            suppressHydrationWarning
        >
            <body className="antialiased">
                {env.NODE_ENV === 'development' && (
                    <Script
                        crossOrigin="anonymous"
                        src="//unpkg.com/react-scan/dist/auto.global.js"
                        strategy="afterInteractive"
                    />
                )}
                {children}
            </body>
        </html>
    );
}
