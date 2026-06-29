import type { Metadata } from "next";
import PageHero    from "@/components/ui/PageHero";
import ContactForm from "@/components/sections/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Start a Project with AshRam",
  description:
    "Get in touch with AshRam Studio to discuss your web app, mobile app, or SaaS project. Based in Hyderabad, India. We respond within one business day.",
  keywords: [
    "contact AshRam", "hire software developers India", "start a project AshRam",
    "software development inquiry Hyderabad", "AshRam studio contact",
  ],
  alternates: { canonical: "https://ashram-agency.vercel.app/contact" },
  openGraph: {
    title:       "Contact AshRam Studio — Start Your Project",
    description: "Tell us about your project. We respond within one business day.",
    url:         "https://ashram-agency.vercel.app/contact",
  },
};

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
