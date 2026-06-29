import Link from "next/link";
import Image from "next/image";
import { agency, footer, contact } from "@/data/data";
import MarqueeStrip from "@/components/ui/MarqueeStrip";

const taglineItems = [agency.tagline, "Web Development", "Mobile Apps", "SaaS Products", "UI/UX Design", "E-Commerce", "Brand Identity"];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Marquee separator */}
      <div className="border-b border-background/10 py-4">
        <MarqueeStrip
          items={taglineItems}
          speed={20}
          itemClassName="text-background/50"
        />
      </div>

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="relative h-8 w-28 mb-6">
              <Image
                src={agency.logoDark}
                alt={agency.name}
                fill
                className="object-contain object-left invert"
              />
            </div>
            <p className="text-sm text-background/60 leading-relaxed max-w-xs mb-6">
              {agency.description}
            </p>
            <p className="text-xs text-background/40 uppercase tracking-widest">
              {agency.location}
            </p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-medium uppercase tracking-[0.25em] text-background/50 mb-6">
                {col.heading}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-background/10 max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-background/40">{footer.copyright}</p>
        <a
          href={`mailto:${contact.email}`}
          className="text-xs text-background/60 hover:text-background transition-colors duration-200"
        >
          {contact.email}
        </a>
      </div>
    </footer>
  );
}
