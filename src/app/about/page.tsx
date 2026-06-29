import type { Metadata } from "next";
import PageHero        from "@/components/ui/PageHero";
import Manifesto       from "@/components/sections/about/Manifesto";
import ProcessSection  from "@/components/sections/about/ProcessSection";
import ProcessOutro    from "@/components/sections/about/ProcessOutro";
import FAQSection      from "@/components/sections/home/FAQSection";
import CTABanner       from "@/components/sections/home/CTABanner";

export const metadata: Metadata = {
  title: "About Us — AshRam Software Development Studio",
  description:
    "Learn about AshRam Studio — a two-person software development agency in Hyderabad, India. Precision-first approach, clean code, and on-time delivery for startups and businesses.",
  keywords: ["about AshRam", "AshRam Studio team", "software studio Hyderabad", "about AshRam agency"],
  alternates: { canonical: "https://ashram-agency.vercel.app/about" },
  openGraph: {
    title:       "About AshRam Studio — Software Development in India",
    description: "A two-person studio obsessively focused on building software that solves real problems.",
    url:         "https://ashram-agency.vercel.app/about",
  },
};

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
