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
        animate={lifted ? { y: -18, scale: 0.8, color: "var(--foreground)" } : { y: 0, scale: 1, color: "var(--muted-foreground)" }}
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

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (_data: FormData) => {
    // Simulate async submit
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
  };

  const w = form.watch();

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: info */}
          <SectionReveal>
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-8">
              Get In Touch
            </p>
            <h2 className="font-heading text-[clamp(2rem,5vw,4rem)] text-foreground mb-10">
              Let&apos;s Start a Conversation.
            </h2>

            <div className="space-y-6 mb-12">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Email</p>
                <a href={`mailto:${contact.email}`} className="text-base text-foreground hover:text-muted-foreground transition-colors">
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Phone</p>
                <a href={`tel:${contact.phone}`} className="text-base text-foreground hover:text-muted-foreground transition-colors">
                  {contact.phone}
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Location</p>
                <p className="text-base text-foreground">{contact.address}</p>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Follow</p>
              <div className="flex gap-6">
                {contact.socials.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    className="text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Right: form */}
          <SectionReveal delay={0.15}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col justify-center h-full min-h-80"
                >
                  <div className="w-10 h-px bg-foreground mb-8" />
                  <h3 className="font-heading text-3xl text-foreground mb-4">Message Received.</h3>
                  <p className="text-base text-muted-foreground font-light leading-relaxed">
                    Thank you for reaching out. We typically respond within one business day.
                    We're looking forward to learning more about your project.
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
                                  rows={4}
                                  className="border-0 border-none shadow-none focus-visible:ring-0 rounded-none bg-transparent pt-6 pb-2 px-0 text-foreground resize-none"
                                />
                              </FormControl>
                            </FloatingField>
                            <FormMessage className="text-xs mt-1" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        size="lg"
                        className="uppercase tracking-wider text-xs w-full md:w-auto px-12"
                      >
                        {form.formState.isSubmitting ? "Sending…" : "Send Message"}
                      </Button>
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
