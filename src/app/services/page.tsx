import type { Metadata } from "next";
import PageHero    from "@/components/ui/PageHero";
import ServicesList from "@/components/sections/services/ServicesList";
import CTABanner   from "@/components/sections/home/CTABanner";
import { services } from "@/data/data";

export const metadata: Metadata = {
  title: "Services — Web, Mobile & SaaS Development",
  description:
    "AshRam offers web development, mobile app development, SaaS product development, UI/UX design, backend APIs, e-commerce, and brand identity — all under one roof in India.",
  keywords: [
    "web development services India", "mobile app development agency", "SaaS development",
    "React Next.js development", "UI UX design India", "backend API development",
    "software development services AshRam",
  ],
  alternates: { canonical: "https://ashram-agency.vercel.app/services" },
  openGraph: {
    title:       "Software Development Services — AshRam Studio",
    description: "Web apps, mobile apps, SaaS, UI/UX, APIs, and brand identity. Built clean, shipped on time.",
    url:         "https://ashram-agency.vercel.app/services",
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        heading="Our Services"
        subheading={`${services.length} core disciplines. Every one executed with the same obsessive attention to detail.`}
      />
      <ServicesList />
      <CTABanner />
    </>
  );
}
