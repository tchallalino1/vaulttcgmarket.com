import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartProvider } from "@/lib/cart-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vault TCG Market — Premium Pokémon TCG Marketplace",
    template: "%s | Vault TCG Market",
  },
  description:
    "Discover rare cards, graded treasures, and sealed collectibles from trusted sellers. The most trusted marketplace for Pokémon TCG.",
  keywords: [
    "pokemon tcg",
    "pokemon cards",
    "graded cards",
    "PSA",
    "CGC",
    "sealed products",
    "vintage cards",
    "pokemon marketplace",
  ],
  openGraph: {
    title: "Vault TCG Market — Premium Pokémon TCG Marketplace",
    description:
      "Discover rare cards, graded treasures, and sealed collectibles from trusted sellers.",
    type: "website",
    locale: "en_US",
    siteName: "Vault TCG Market",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <CartProvider>
          <TopBar />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
