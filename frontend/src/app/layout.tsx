import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: true
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: true,
  adjustFontFallback: false
});

const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://aegis-legal-partners.vercel.app");

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Aegis Legal Partners | Elite Corporate, Private Wealth & Trial Counsel",
    template: "%s | Aegis Legal Partners"
  },
  description:
    "A luxury legal platform for board-level corporate law, M&A, intellectual property, criminal defense, and high-net-worth family counsel.",
  keywords: [
    "elite law firm",
    "corporate legal counsel",
    "mergers and acquisitions law",
    "intellectual property attorneys",
    "criminal defense counsel",
    "high net worth family law",
    "private wealth legal advisory",
    "enterprise legal services"
  ],
  applicationName: "Aegis Legal Partners",
  authors: [{ name: "Aegis Legal Partners" }],
  creator: "Aegis Legal Partners",
  publisher: "Aegis Legal Partners",
  alternates: {
    canonical: "/"
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.svg",
    apple: "/icons/icon-192.svg"
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Aegis Legal Partners",
    title: "Aegis Legal Partners | Elite Legal Counsel",
    description:
      "Cinematic enterprise counsel for high-stakes transactions, private wealth protection, intellectual property, and trial strategy.",
    images: [
      {
        url: "/og-aegis.svg",
        width: 1200,
        height: 630,
        alt: "Aegis Legal Partners luxury legal counsel brand card"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Aegis Legal Partners | Elite Legal Counsel",
    description:
      "Luxury legal counsel for boardrooms, founders, family offices, and high-stakes litigation.",
    images: ["/og-aegis.svg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aegis Legal"
  },
  category: "legal services"
};

export const viewport: Viewport = {
  themeColor: "#090D16",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${bodoni.variable}`}>
      <body className="font-sans antialiased">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
