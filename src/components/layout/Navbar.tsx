"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { agency, navLinks } from "@/data/data";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrolled   = useScrolled(80);
  const pathname   = usePathname();
  const { theme }  = useTheme();
  const [open, setOpen]       = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const logoSrc = mounted
    ? (theme === "dark" ? agency.logoDark : agency.logoLight)
    : agency.logoDark;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="relative flex-shrink-0 h-10 w-30" aria-label={agency.name}>
            <Image
              src={logoSrc}
              alt={agency.name}
              fill
              sizes="112px"
              className="object-contain object-left"
              priority
              onError={(e) => {
                // Fallback to text if image fails
                const el = e.currentTarget.parentElement;
                if (el) el.innerHTML = `<span class="font-heading text-xl text-foreground">${agency.logoText}</span>`;
              }}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative text-sm font-medium transition-colors duration-200 group",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px bg-foreground origin-left transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: theme toggle + CTA */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button asChild size="sm" variant="outline" className="hidden md:inline-flex text-xs tracking-wider uppercase px-6">
              <Link href="/contact">Start a Project</Link>
            </Button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="block h-px bg-foreground origin-center w-full"
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-px bg-foreground origin-center w-3/4"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -6, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="block h-px bg-foreground origin-center w-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-background/60 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-background border-l border-border flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <span className="font-heading text-sm text-foreground">{agency.name}</span>
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-2 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block py-4 text-2xl font-heading border-b border-border/50 transition-colors",
                        pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-6 border-t border-border">
                <Button asChild className="w-full uppercase tracking-wider text-xs">
                  <Link href="/contact" onClick={() => setOpen(false)}>Start a Project</Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
