import type { Metadata } from "next";
import PageHero  from "@/components/ui/PageHero";
import WorksGrid from "@/components/sections/works/WorksGrid";
import CTABanner from "@/components/sections/home/CTABanner";
import { projects } from "@/data/data";

export const metadata: Metadata = {
  title: "Portfolio — Projects & Case Studies",
  description:
    "Browse AshRam Studio's portfolio of web apps, mobile apps, and digital products. Real projects, real results — delivered for startups and businesses across India.",
  keywords: [
    "AshRam portfolio", "software development portfolio India", "web app projects",
    "mobile app case studies", "React Next.js projects", "AshRam works",
  ],
  alternates: { canonical: "https://ashram-agency.vercel.app/works" },
  openGraph: {
    title:       "Portfolio — AshRam Studio Projects & Case Studies",
    description: "Real projects, real results. Web apps, mobile apps, and digital products built for businesses.",
    url:         "https://ashram-agency.vercel.app/works",
  },
};

export default function WorksPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        heading="Our Portfolio"
        subheading={`${projects.length} projects across branding, UI/UX, print, motion, and more.`}
      />
      <WorksGrid />
      <CTABanner />
    </>
  );
}
