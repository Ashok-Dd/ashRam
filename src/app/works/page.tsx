import type { Metadata } from "next";
import PageHero  from "@/components/ui/PageHero";
import WorksGrid from "@/components/sections/works/WorksGrid";
import CTABanner from "@/components/sections/home/CTABanner";
import { projects } from "@/data/data";

export const metadata: Metadata = { title: "Works" };

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
