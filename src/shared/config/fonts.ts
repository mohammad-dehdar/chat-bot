import localFont from "next/font/local";

const fontPath = "../config/fonts/iran-sans";

export const iranSansX = localFont({
  src: [
    { path: `${fontPath}/IRANSansX-UltraLight.woff`, weight: "100", style: "normal" },
    { path: `${fontPath}/IRANSansX-Light.woff`, weight: "300", style: "normal" },
    { path: `${fontPath}/IRANSansX-Regular.woff`, weight: "400", style: "normal" },
    { path: `${fontPath}/IRANSansX-Medium.woff`, weight: "500", style: "normal" },
    { path: `${fontPath}/IRANSansX-DemiBold.woff`, weight: "600", style: "normal" },
    { path: `${fontPath}/IRANSansX-Bold.woff`, weight: "700", style: "normal" },
  ],
  variable: "--font-iran-sans-x",
  display: "swap",
});
