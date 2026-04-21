import type { Metadata, Viewport } from "next";
import { Inter, Fraunces, Montserrat, Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BasketDrawer } from "@/components/basket/BasketDrawer";
import { BasketStickyBar } from "@/components/basket/BasketStickyBar";
import { Agentation } from "@/components/dev/Agentation";
import { ThemeSwitcher } from "@/components/dev/ThemeSwitcher";
import { TypographySwitcher } from "@/components/dev/TypographySwitcher";

const bootstrap = `try{
  var t=localStorage.getItem('je:theme');
  if(t==='blue'||t==='forest'||t==='olive'||t==='lime'||t==='amber')document.documentElement.setAttribute('data-theme',t);
  var f=localStorage.getItem('je:typography');
  if(f==='montserrat'||f==='jakarta'||f==='dm-sans')document.documentElement.setAttribute('data-typography',f);
}catch(e){}`;

const inter = Inter({
  variable: "--font-inter",
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

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
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
  themeColor: "#FFF5E6",
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
      className={`${inter.variable} ${fraunces.variable} ${montserrat.variable} ${jakarta.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className="min-h-screen flex flex-col bg-mist text-ink antialiased">
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        <BasketStickyBar />
        <BasketDrawer />
        <Agentation />
        <ThemeSwitcher />
        <TypographySwitcher />
      </body>
    </html>
  );
}
