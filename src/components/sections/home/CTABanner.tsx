import Link from "next/link";
import { Button } from "@/components/ui/button";
import SectionReveal from "@/components/ui/SectionReveal";
import { agency, contact } from "@/data/data";

export default function CTABanner() {
  return (
    <section className="bg-foreground text-background py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        <SectionReveal>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-background/40 mb-8">
            Ready to Start?
          </p>
          <h2 className="font-heading text-[clamp(2.5rem,8vw,7rem)] text-background mb-10 max-w-4xl mx-auto">
            Let&apos;s Build Something Remarkable.
          </h2>
          <p className="text-base text-background/60 font-light max-w-lg mx-auto mb-12 leading-relaxed">
            {contact.availability}. Tell us what you&apos;re building and we&apos;ll tell you how we can help.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" variant="inverted">
              <Link href="/contact">Let&apos;s Talk</Link>
            </Button>
            <a
              href={`mailto:${contact.email}`}
              className="text-sm text-background/50 hover:text-background transition-colors duration-300 underline underline-offset-4"
            >
              {contact.email}
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
