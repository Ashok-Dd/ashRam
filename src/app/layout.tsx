import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { agency } from "@/data/data";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${agency.name} — ${agency.subTagline}`,
    template: `%s | ${agency.name}`,
  },
  description: agency.description,
  icons: {
    icon:     { url: agency.logoDark, type: "image/png", sizes: "any" },
    shortcut: { url: agency.logoDark, type: "image/png" },
    apple:    { url: agency.logoDark, type: "image/png" },
  },
  openGraph: {
    title: agency.name,
    description: agency.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
