import type { Metadata } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { agency, contact } from "@/data/data";

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

const SITE_URL = "https://ashram-agency.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "AshRam — Software Development Studio in India",
    template: "%s | AshRam Studio",
  },

  description:
    "AshRam is a software development studio based in Hyderabad, India. We build web apps, mobile apps, SaaS products, and digital solutions for startups and businesses. Expert React, Next.js, and Node.js development.",

  keywords: [
    "AshRam",
    "AshRam Studio",
    "AshRam Agency",
    "software development India",
    "software development Hyderabad",
    "web development India",
    "mobile app development India",
    "React development agency",
    "Next.js development studio",
    "SaaS product development",
    "startup software development",
    "software development solutions",
    "digital product studio India",
    "custom software development",
    "full stack development India",
  ],

  authors:   [{ name: "AshRam Studio", url: SITE_URL }],
  creator:   "AshRam Studio",
  publisher: "AshRam Studio",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         SITE_URL,
    siteName:    "AshRam Studio",
    title:       "AshRam — Software Development Studio in India",
    description: "We build web apps, mobile apps, and digital products for startups and businesses. Based in Hyderabad, India.",
    images: [
      {
        url:    "/og-image.png",
        width:  1200,
        height: 630,
        alt:    "AshRam Studio — Software Development",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AshRam — Software Development Studio",
    description: "We build web apps, mobile apps, and digital products for startups and businesses. Based in Hyderabad, India.",
    images:      ["/og-image.png"],
    creator:     "@ashramstudio",
    site:        "@ashramstudio",
  },

  alternates: {
    canonical: SITE_URL,
  },

  // ── Replace the value below after verifying in Google Search Console ────────
  verification: {
    google: "SvscgnnD8Z493O61OcxlHF26QrUP7cUt3V6Nsurv5A8",
  },

  icons: {
    icon:     { url: agency.logoDark, type: "image/png", sizes: "any" },
    shortcut: { url: agency.logoDark, type: "image/png" },
    apple:    { url: agency.logoDark, type: "image/png" },
  },
};

// ── JSON-LD structured data ──────────────────────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type":         "Organization",
      "@id":           `${SITE_URL}/#organization`,
      "name":          "AshRam Studio",
      "alternateName": ["AshRam", "AshRam Agency"],
      "url":           SITE_URL,
      "logo": {
        "@type":         "ImageObject",
        "url":           `${SITE_URL}/white-logo.png`,
        "contentUrl":    `${SITE_URL}/white-logo.png`,
        "width":         400,
        "height":        120,
      },
      "description": agency.description,
      "foundingDate":  agency.founded,
      "address": {
        "@type":           "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion":   "Telangana",
        "addressCountry":  "IN",
      },
      "contactPoint": {
        "@type":       "ContactPoint",
        "email":       contact.email,
        "telephone":   contact.phone,
        "contactType": "customer service",
        "areaServed":  "IN",
        "availableLanguage": "English",
      },
      "sameAs": contact.socials.map((s) => s.url),
    },
    {
      "@type":     "WebSite",
      "@id":       `${SITE_URL}/#website`,
      "url":       SITE_URL,
      "name":      "AshRam Studio",
      "publisher": { "@id": `${SITE_URL}/#organization` },
      "potentialAction": {
        "@type":       "SearchAction",
        "target":      `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type":            "ProfessionalService",
      "@id":              `${SITE_URL}/#service`,
      "name":             "AshRam Studio",
      "image":            `${SITE_URL}/og-image.png`,
      "url":              SITE_URL,
      "telephone":        contact.phone,
      "email":            contact.email,
      "priceRange":       "$$",
      "address": {
        "@type":           "PostalAddress",
        "addressLocality": "Hyderabad",
        "addressRegion":   "Telangana",
        "addressCountry":  "IN",
      },
      "geo": {
        "@type":     "GeoCoordinates",
        "latitude":  17.3850,
        "longitude": 78.4867,
      },
      "openingHoursSpecification": {
        "@type":     "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens":     "09:00",
        "closes":    "18:00",
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name":  "Software Development Services",
        "itemListElement": [
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile App Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SaaS Product Development" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "UI/UX Design" } },
          { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Brand & Visual Identity" } },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable}`}
    >
      <body className="antialiased overflow-x-hidden">
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          strategy="beforeInteractive"
        />
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
