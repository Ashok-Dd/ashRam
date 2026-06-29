import { MetadataRoute } from "next";

const BASE = "https://ashram-agency.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              BASE,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1.0,
    },
    {
      url:              `${BASE}/about`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.8,
    },
    {
      url:              `${BASE}/services`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.9,
    },
    {
      url:              `${BASE}/works`,
      lastModified:     new Date(),
      changeFrequency:  "weekly",
      priority:         0.8,
    },
    {
      url:              `${BASE}/team`,
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.6,
    },
    {
      url:              `${BASE}/contact`,
      lastModified:     new Date(),
      changeFrequency:  "yearly",
      priority:         0.7,
    },
  ];
}
