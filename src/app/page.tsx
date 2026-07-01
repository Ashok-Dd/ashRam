import type { Metadata } from "next";
import HeroSection         from "@/components/sections/home/HeroSection";
import AboutPreview        from "@/components/sections/home/AboutPreview";
import ServicesPreview     from "@/components/sections/home/ServicesPreview";
import ProcessJourney      from "@/components/sections/home/ProcessJourney";
import WorksPreview        from "@/components/sections/home/WorksPreview";
import TrustSection        from "@/components/sections/home/TrustSection";
import TeamPreview         from "@/components/sections/home/TeamPreview";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import FAQSection          from "@/components/sections/home/FAQSection";
import CTABanner           from "@/components/sections/home/CTABanner";
import MarqueeStrip        from "@/components/ui/MarqueeStrip";
import { services }        from "@/data/data";

export const metadata: Metadata = {
  title: "AshRam — Software Development Studio in India",
  description:
    "AshRam builds web apps, mobile apps, and SaaS products for startups and businesses. Clean code, on-time delivery. Based in Hyderabad, India.",
  alternates: { canonical: "https://ashram-agency.vercel.app" },
  openGraph: {
    title:       "AshRam — Software Development Studio",
    description: "Web apps, mobile apps, and SaaS products built for startups. Based in Hyderabad, India.",
    url:         "https://ashram-agency.vercel.app",
  },
};

export default function HomePage() {
  const serviceNames = services.map((s) => s.title);
  return (
    <>
      <HeroSection />

      {/* Services ticker strip */}
      <section className="relative overflow-hidden bg-foreground" aria-label="Services">
        {/* Edge gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-linear-to-r from-foreground to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-linear-to-l from-foreground to-transparent" />
        <div className="py-5">
          <MarqueeStrip
            items={serviceNames}
            speed={20}
            separator="/"
            itemClassName="text-[11px] font-medium uppercase tracking-[0.28em] text-background/50"
          />
        </div>
      </section>

      <AboutPreview />
      <ServicesPreview />
      <ProcessJourney />
      {/*
        Works slides left on exit, revealing Team directly underneath.
        Team (z:1) is the persistent background layer.
        Works sticky panel (z:2) is on top — transparent shell so Team
        shows through the moment the inner panel sweeps left.
        margin-top: -100vh on the works wrapper pulls it up so both
        sections share the same viewport origin.
      */}
      <div style={{ position: "relative" }}>
        {/* Team: sticky at z:1, always behind Works */}
        <div style={{ position: "sticky", top: 0, zIndex: 1, height: "100vh", overflow: "hidden" }}>
          <TeamPreview />
        </div>
        {/* Works: z:2, starts at same scroll origin as Team */}
        <div style={{ marginTop: "-100vh", position: "relative", zIndex: 2 }}>
          <WorksPreview />
        </div>
      </div>
      <TestimonialsSection />
      <FAQSection abbreviated />
      <CTABanner />
    </>
  );
}
