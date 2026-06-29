import type { Metadata } from "next";
import PageHero   from "@/components/ui/PageHero";
import Manifesto  from "@/components/sections/about/Manifesto";
import FAQSection from "@/components/sections/home/FAQSection";
import CTABanner  from "@/components/sections/home/CTABanner";
import { about }  from "@/data/data";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={about.eyebrow}
        heading="Who We Are"
        subheading="A two-person studio that builds software for startups and businesses that need work that actually ships."
      />
      <Manifesto />
      <FAQSection id="faq" />
      <CTABanner />
    </>
  );
}
