import type { Metadata, Viewport } from "next";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://housevision-ai.vercel.app"),
  title: { default: "HouseVision AI", template: "%s | HouseVision AI" },
  description: "AI-powered residential intelligence and explainable property valuation.",
  keywords: ["house price prediction", "property valuation", "machine learning", "real estate analytics"],
  openGraph: {
    title: "HouseVision AI",
    description: "Estimate residential property values with machine learning and market intelligence.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#07110f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-mint focus:px-4 focus:py-3 focus:text-ink">
          Skip to content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

