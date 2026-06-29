import type { Metadata } from "next";
import PageHero    from "@/components/ui/PageHero";
import ServicesList from "@/components/sections/services/ServicesList";
import CTABanner   from "@/components/sections/home/CTABanner";
import { services } from "@/data/data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        heading="Our Services"
        subheading={`${services.length} core disciplines. Every one executed with the same obsessive attention to detail.`}
      />
      <ServicesList />
      <CTABanner />
    </>
  );
}
