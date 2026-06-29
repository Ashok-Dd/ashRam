import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SectionReveal from "@/components/ui/SectionReveal";
import { faqs } from "@/data/data";

interface Props {
  abbreviated?: boolean;
  id?: string;
}

export default function FAQSection({ abbreviated = false, id }: Props) {
  const items = abbreviated ? faqs.slice(0, 4) : faqs;

  return (
    <section id={id} className="bg-background py-24 md:py-32 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-16">
          {/* Left: label */}
          <SectionReveal>
            <div className="lg:sticky lg:top-28">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                FAQ
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Frequently Asked
              </h2>
              {abbreviated && (
                <Button asChild variant="ghost" className="uppercase tracking-wider text-xs px-4">
                  <Link href="/about#faq">See All FAQs →</Link>
                </Button>
              )}
            </div>
          </SectionReveal>

          {/* Right: accordion */}
          <SectionReveal delay={0.1}>
            <Accordion multiple={false} className="space-y-0">
              {items.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger className="py-6 text-left font-heading text-lg md:text-xl text-foreground hover:no-underline [&>svg]:hidden group">
                    <span className="flex items-center gap-4 w-full">
                      <span className="text-xs font-normal text-muted-foreground tabular-nums w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 group-hover:translate-x-1 transition-transform duration-200">
                        {faq.question}
                      </span>
                      {/* <span className="text-muted-foreground text-lg font-light shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-45">
                        +
                      </span> */}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-10 text-muted-foreground font-light leading-relaxed text-sm">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
