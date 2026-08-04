import type { Metadata, Viewport } from "next";
import { Archivo, Fredoka, Homemade_Apple, Space_Mono } from "next/font/google";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Preloader } from "@/components/layout/Preloader";
import { site } from "@/content/site";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-fredoka",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-homemade-apple",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  icons: { icon: "/assets/oushy-mark.png" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    images: [{ url: "/assets/oushy-lockup.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#F6EFE9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${archivo.variable} ${fredoka.variable} ${spaceMono.variable} ${homemadeApple.variable}`}
    >
      <head>
        {/* Without JS the scroll reveals never fire, so pin everything visible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-svh">
        <Preloader />
        {children}
        <GrainOverlay />
        <CustomCursor />
      </body>
    </html>
  );
}
