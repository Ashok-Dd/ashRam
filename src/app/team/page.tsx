import type { Metadata } from "next";
import PageHero      from "@/components/ui/PageHero";
import TeamEditorial from "@/components/sections/team/TeamEditorial";
import CTABanner     from "@/components/sections/home/CTABanner";

export const metadata: Metadata = { title: "Team" };

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
