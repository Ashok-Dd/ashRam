"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useScrolled } from "@/hooks/useScrolled";
import { agency, navLinks } from "@/data/data";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrolled  = useScrolled(60);
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b"
            : "bg-transparent"
        )}
        style={scrolled ? {
          background: "rgba(10,10,10,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "rgba(255,255,255,0.08)",
        } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link href="/" className="relative flex-shrink-0 h-9 w-28" aria-label={agency.name}>
            <Image
              src={agency.logoDark}
              alt={agency.name}
              fill
              sizes="112px"
              className="object-contain object-left"
              priority
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
                  className="relative text-[11px] uppercase tracking-[0.2em] font-medium transition-colors duration-200 group"
                  style={{ color: active ? "rgba(240,240,240,0.95)" : "rgba(240,240,240,0.45)" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(240,240,240,0.95)")}
                  onMouseLeave={e => (e.currentTarget.style.color = active ? "rgba(240,240,240,0.95)" : "rgba(240,240,240,0.45)")}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 right-0 h-px origin-left transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                    style={{ background: "rgba(240,240,240,0.6)" }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hidden md:inline-flex btn-fill-outline border border-white/20 text-[10px] uppercase tracking-[0.22em] font-medium px-5 py-2.5"
            >
              Let&apos;s Talk
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-[5px]"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <motion.span
                animate={open ? { rotate: 45, y: 7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="block h-px origin-center w-full"
                style={{ background: "rgba(240,240,240,0.7)" }}
              />
              <motion.span
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block h-px origin-center w-3/4"
                style={{ background: "rgba(240,240,240,0.7)" }}
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
                className="block h-px origin-center w-full"
                style={{ background: "rgba(240,240,240,0.7)" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 flex flex-col md:hidden"
              style={{ background: "#0e0e0e", borderLeft: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="flex items-center justify-between p-6"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="font-heading text-sm" style={{ color: "rgba(240,240,240,0.7)" }}>
                  {agency.name}
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  style={{ color: "rgba(240,240,240,0.45)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col p-6 gap-1 flex-1">
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
                      className="block py-4 font-heading text-2xl transition-colors duration-200"
                      style={{
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                        color: pathname === link.href ? "rgba(240,240,240,0.95)" : "rgba(240,240,240,0.45)",
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-6" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-fill-outline border border-white/20 w-full text-center py-3.5 text-[10px] uppercase tracking-[0.25em] font-medium"
                >
                  Let&apos;s Talk
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
