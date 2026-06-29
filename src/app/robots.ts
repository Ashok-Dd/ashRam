import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow:     "/",
        disallow:  ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://ashram-agency.vercel.app/sitemap.xml",
    host:    "https://ashram-agency.vercel.app",
  };
}
