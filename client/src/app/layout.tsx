import type { Metadata, Viewport } from "next";
import { Fraunces, Montserrat } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BasketDrawer } from "@/components/basket/BasketDrawer";
import { BasketStickyBar } from "@/components/basket/BasketStickyBar";
import { Agentation } from "@/components/dev/Agentation";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Jersey Eats — the island's food, delivered well",
    template: "%s · Jersey Eats",
  },
  description:
    "Order from 30+ local restaurants across all 12 Jersey parishes. Delivered to your door, parish-by-parish.",
  applicationName: "Jersey Eats",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, title: "Jersey Eats", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  themeColor: "#397BFF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${fraunces.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-mist text-ink antialiased">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <BasketStickyBar />
        <BasketDrawer />
        <Agentation />
      </body>
    </html>
  );
}
