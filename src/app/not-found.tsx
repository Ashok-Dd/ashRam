import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-background px-6 overflow-hidden">

      {/* Giant ghost number */}
      <span
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center font-heading text-[clamp(14rem,38vw,34rem)] leading-none text-foreground/[0.04] select-none pointer-events-none"
      >
        404
      </span>

      {/* Content */}
      <div className="relative text-center max-w-lg mx-auto">

        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-muted-foreground mb-8">
          Error 404
        </p>

        <h1 className="font-heading text-[clamp(2.4rem,6vw,5rem)] text-foreground leading-[1.0] tracking-tight mb-6">
          Page Not Found.
        </h1>

        <p className="text-base font-light text-muted-foreground leading-relaxed mb-12 max-w-sm mx-auto">
          The page you&apos;re looking for may have moved, been removed, or never existed.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/works">View Our Work</Link>
          </Button>
        </div>

      </div>

      {/* Bottom strip — matches HeroSection */}
      <div className="absolute bottom-10 inset-x-0 flex items-center justify-between px-6 md:px-20 text-xs text-muted-foreground uppercase tracking-[0.25em]">
        <span>AshRam Studio</span>
        <span>404</span>
      </div>

    </section>
  );
}
