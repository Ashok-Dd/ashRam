"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contact } from "@/data/data";
import SectionReveal from "@/components/ui/SectionReveal";
import { FaInstagram, FaBehance, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(20, "Message must be at least 20 characters"),
});
type FormData = z.infer<typeof schema>;

function FloatingField({
  label,
  children,
  hasValue,
}: {
  label: string;
  children: React.ReactNode;
  hasValue: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || hasValue;

  return (
    <div
      className="relative border-b border-border focus-within:border-foreground transition-colors duration-300"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      <motion.label
        animate={
          lifted
            ? { y: -18, scale: 0.8, color: "var(--foreground)" }
            : { y: 0, scale: 1, color: "var(--muted-foreground)" }
        }
        transition={{ duration: 0.25 }}
        className="absolute left-0 top-4 text-sm font-light origin-left pointer-events-none will-gpu"
        style={{ transformOrigin: "left" }}
      >
        {label}
      </motion.label>
      {children}
    </div>
  );
}

const infoRows = [
  { label: "Email",    getValue: () => contact.email,   getHref: () => `mailto:${contact.email}` },
  { label: "Phone",    getValue: () => contact.phone,   getHref: () => `tel:${contact.phone}` },
  { label: "Location", getValue: () => contact.address, getHref: () => null },
] as const;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  const w = form.watch();

  return (
    <section className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">

        {/* Meta row */}
        <SectionReveal>
          <div className="flex items-center justify-between py-7 border-b border-border">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              Start a Project
            </p>
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-muted-foreground">
              {contact.email}
            </p>
          </div>
        </SectionReveal>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-16 lg:gap-24 py-20 md:py-28">

          {/* Left: studio info */}
          <SectionReveal>
            <div>
              {/* Availability badge */}
              <div className="inline-flex items-center gap-2.5 border border-border px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground mb-10">
                <span className="w-1.5 h-1.5 rounded-full bg-foreground/60 shrink-0" />
                {contact.availability}
              </div>

              <h2 className="font-heading text-[clamp(1.9rem,3.5vw,3.2rem)] text-foreground leading-[1.05] tracking-tight mb-12">
                We&apos;d love to hear<br />about your project.
              </h2>

              {/* Contact detail rows */}
              <div className="border-t border-border mb-8">
                {infoRows.map(({ label, getValue, getHref }) => {
                  const value = getValue();
                  const href  = getHref();
                  return (
                    <div
                      key={label}
                      className="flex items-center justify-between py-5 border-b border-border"
                    >
                      <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                        {label}
                      </span>
                      {href ? (
                        <a
                          href={href}
                          className="text-sm text-foreground hover:text-muted-foreground transition-colors duration-200"
                        >
                          {value}
                        </a>
                      ) : (
                        <span className="text-sm text-foreground">{value}</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social icon links */}
              <div className="flex items-center gap-3">
                {contact.socials.map((s) => {
                  const Icon =
                    s.platform === "Instagram" ? FaInstagram :
                    s.platform === "Behance"   ? FaBehance   :
                    s.platform === "LinkedIn"  ? FaLinkedinIn :
                                                 FaXTwitter;
                  return (
                    <Button
                      key={s.platform}
                      asChild
                      variant="outline"
                      size="icon"
                    >
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.platform}
                      >
                        <Icon size={15} />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          </SectionReveal>

          {/* Right: form */}
          <SectionReveal delay={0.12}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col justify-center min-h-80"
                >
                  <div className="w-10 h-px bg-foreground mb-8" />
                  <h3 className="font-heading text-3xl text-foreground mb-4">
                    Message Received.
                  </h3>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    Thank you for reaching out. We typically respond within one business day
                    and look forward to learning more about your project.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FloatingField label="Your Name *" hasValue={!!w.name}>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="border-0 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent pt-6 pb-2 px-0 text-foreground"
                                />
                              </FormControl>
                            </FloatingField>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FloatingField label="Email Address *" hasValue={!!w.email}>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="email"
                                  className="border-0 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent pt-6 pb-2 px-0 text-foreground"
                                />
                              </FormControl>
                            </FloatingField>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FloatingField label="Company / Brand (Optional)" hasValue={!!w.company}>
                              <FormControl>
                                <Input
                                  {...field}
                                  className="border-0 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent pt-6 pb-2 px-0 text-foreground"
                                />
                              </FormControl>
                            </FloatingField>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FloatingField label="Tell Us About Your Project *" hasValue={!!w.message}>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  rows={5}
                                  className="border-0 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent pt-6 pb-2 px-0 text-foreground resize-none"
                                />
                              </FormControl>
                            </FloatingField>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />

                      <div className="pt-4">
                        <Button
                          type="submit"
                          disabled={form.formState.isSubmitting}
                          size="lg"
                          className="uppercase tracking-wider text-xs w-full sm:w-auto px-14"
                        >
                          {form.formState.isSubmitting ? "Sending…" : "Send Message"}
                        </Button>
                      </div>

                    </form>
                  </Form>
                </motion.div>
              )}
            </AnimatePresence>
          </SectionReveal>

        </div>
      </div>
    </section>
  );
}
