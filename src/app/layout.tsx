import type { Metadata, Viewport } from "next";
import { Quicksand, Poppins, Manrope } from "next/font/google";
import { MarclayProvider, ToastProvider } from "marclayui";
import { themeInitScript } from "marclayui/theme-init";
import { Analytics } from "@vercel/analytics/next";
import "marclayui/styles.css";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3211"),
  title: {
    default: "MarclayUI — Claymorphism UI library for React & Next.js",
    template: "%s — MarclayUI",
  },
  description:
    "MarclayUI is a claymorphism + neumorphism React component library with light/dark theming, runtime color control and zero runtime dependencies. TypeScript-first, Next.js ready.",
  keywords: [
    "react ui library",
    "claymorphism",
    "neumorphism",
    "components",
    "dark mode",
    "theming",
    "nextjs",
  ],
  authors: [{ name: "Akram", url: "https://github.com/akram6t" }],
  creator: "Akram",
  openGraph: {
    title: "MarclayUI — Claymorphism UI library for React & Next.js",
    description:
      "Claymorphism + neumorphism React components with light/dark theming, style presets and runtime color control. Zero runtime dependencies.",
    type: "website",
    siteName: "MarclayUI",
  },
  twitter: {
    card: "summary_large_image",
    title: "MarclayUI — Claymorphism UI library for React & Next.js",
    description:
      "Claymorphism + neumorphism React components with light/dark theming, style presets and runtime color control.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ece4da" },
    { media: "(prefers-color-scheme: dark)", color: "#27211b" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${quicksand.variable} ${poppins.variable} ${manrope.variable}`}
    >
      <body className="mcl-root">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <MarclayProvider>
          <ToastProvider>{children}</ToastProvider>
        </MarclayProvider>
        <Analytics />
      </body>
    </html>
  );
}
