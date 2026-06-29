import type { Metadata } from "next";
import PageHero    from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        heading="Let's Build Something Remarkable."
        subheading="Tell us about your project and we'll get back to you within one business day."
      />
      <ContactForm />
    </>
  );
}
