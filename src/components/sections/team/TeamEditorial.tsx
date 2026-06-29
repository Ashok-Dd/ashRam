"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { team } from "@/data/data";

gsap.registerPlugin(ScrollTrigger);

export default function TeamEditorial() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;

        const textSide  = section.querySelector<HTMLElement>("[data-text-side]");
        const photoSide = section.querySelector<HTMLElement>("[data-photo-side]");
        const isRight   = section.dataset.textRight === "true";

        if (textSide) {
          gsap.from(textSide, {
            x: isRight ? 60 : -60,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
          });
        }

        if (photoSide) {
          // Clip-path reveal: starts fully covered from right, opens left
          gsap.from(photoSide, {
            clipPath: "inset(0 100% 0 0)",
            opacity: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: { trigger: section, start: "top 75%", toggleActions: "play none none none" },
          });
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div>
      {team.map((member, i) => {
        const isRight = i % 2 === 1;
        return (
          <section
            key={member.id}
            ref={(el) => { sectionsRef.current[i] = el; }}
            data-text-right={isRight}
            className={`min-h-[70vh] flex flex-col md:flex-row ${
              isRight ? "md:flex-row-reverse" : ""
            } ${isRight ? "bg-background" : "bg-surface"} border-t border-border`}
          >
            {/* Text side */}
            <div
              data-text-side
              className={`flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 will-gpu ${
                isRight ? "bg-background" : "bg-surface"
              }`}
            >
              {/* Member number */}
              <span className="font-heading text-[8rem] md:text-[12rem] leading-none text-foreground/5 select-none pointer-events-none block -ml-2 mb-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="-mt-6 md:-mt-12">
                <h2 className="font-heading text-[clamp(2.5rem,5vw,5rem)] text-foreground mb-2">
                  {member.name}
                </h2>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground mb-8">
                  {member.role}
                </p>
                <p className="text-base font-light text-muted-foreground leading-relaxed max-w-md mb-10">
                  {member.fullBio}
                </p>
                <div className="flex gap-6">
                  {member.social.map((s) => (
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
            </div>

            {/* Photo side */}
            <div
              data-photo-side
              className="flex-1 min-h-[50vw] md:min-h-0 relative overflow-hidden will-gpu bg-muted"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-700 hover:scale-105 will-gpu"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Subtle name watermark over photo */}
              <div className="absolute inset-0 flex items-end justify-end p-6 pointer-events-none">
                <span className="font-heading text-[4rem] leading-none select-none text-white/10">
                  {member.name.split(" ")[0].slice(0, 2).toUpperCase()}
                </span>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
