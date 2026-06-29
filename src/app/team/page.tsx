import type { Metadata } from "next";
import PageHero      from "@/components/ui/PageHero";
import TeamEditorial from "@/components/sections/team/TeamEditorial";
import CTABanner     from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "Team — The People Behind AshRam",
  description:
    "Meet the AshRam Studio team — two developers dedicated to building great software. A small studio with singular focus: shipping products that work.",
  keywords: ["AshRam team", "AshRam founders", "software developers India", "AshRam studio people"],
  alternates: { canonical: "https://ashram-agency.vercel.app/team" },
  openGraph: {
    title:       "Team — The People Behind AshRam Studio",
    description: "Two developers. One obsession: building software that works.",
    url:         "https://ashram-agency.vercel.app/team",
  },
};

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The People"
        heading="Two Minds, One Obsession."
        subheading="We're a small team by design. Every project gets our full attention — because there's nowhere to hide in a studio of two."
      />
      <TeamEditorial />
      <CTABanner />
    </>
  );
}
