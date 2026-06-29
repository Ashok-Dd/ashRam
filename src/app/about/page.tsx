import type { Metadata } from "next";
import PageHero        from "@/components/ui/PageHero";
import Manifesto       from "@/components/sections/about/Manifesto";
import ProcessSection  from "@/components/sections/about/ProcessSection";
import ProcessOutro    from "@/components/sections/about/ProcessOutro";
import FAQSection      from "@/components/sections/home/FAQSection";
import CTABanner       from "@/components/sections/home/CTABanner";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="AshRam Studio"
        heading="Who We Are"
        subheading="A two-person studio obsessively focused on building software that solves real problems, ships on time, and lasts."
      />
      <Manifesto />

      <FAQSection id="faq" />
      <CTABanner />
    </>
  );
}
