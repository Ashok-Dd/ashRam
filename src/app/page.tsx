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
      <WorksPreview />
      {/* <TrustSection /> */}
      <TeamPreview />
      <TestimonialsSection />
      <FAQSection abbreviated />
      <CTABanner />
    </>
  );
}
