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
      <div className="border-b border-t border-border py-4 bg-surface">
        <MarqueeStrip items={serviceNames} speed={35} />
      </div>

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
