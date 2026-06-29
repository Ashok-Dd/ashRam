"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

// Each random char is held for this many ms before flipping to the next.
// With WORD_DURATION = 400ms: 400 / 80 ≈ 5 flips per letter position.
const CHAR_INTERVAL = 80;

interface Props {
  text: string;
  delay?: number;
  duration?: number;
  startHidden?: boolean;
  className?: string;
}

export default function ScrambleText({
  text,
  delay       = 0,
  duration    = 400,
  startHidden = false,
  className,
}: Props) {
  const [output,  setOutput]  = useState<string[]>(() => text.split(""));
  const [visible, setVisible] = useState(!startHidden);

  const rafRef   = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const letters = text.split("");

    // Working buffer of the current random char for each position.
    // Pre-filled so the word shows random chars the instant it becomes visible.
    const buf = letters.map((c) =>
      c === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)],
    );

    if (startHidden) setOutput([...buf]);

    let lastFlip = 0; // timestamp of the last random-char update

    const run = () => {
      if (startHidden) setVisible(true);

      const t0 = performance.now();

      const tick = (now: number) => {
        const t       = Math.min((now - t0) / duration, 1);
        // 0–0.28 → full chaos; 0.28–1 → settle left → right
        const settleT = t < 0.28 ? 0 : (t - 0.28) / 0.72;

        // Flip random chars only every CHAR_INTERVAL ms (≈5 flips total)
        if (now - lastFlip >= CHAR_INTERVAL) {
          lastFlip = now;
          letters.forEach((ch, i) => {
            if (ch === " ") return;
            const threshold = i / Math.max(letters.length - 1, 1);
            if (settleT < threshold) {
              buf[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }
          });
        }

        setOutput(
          letters.map((ch, i) => {
            if (ch === " ") return " ";
            const threshold = i / Math.max(letters.length - 1, 1);
            return settleT >= threshold ? ch : buf[i];
          }),
        );

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setOutput([...letters]);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    timerRef.current = setTimeout(run, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, delay, duration, startHidden]);

  return (
    <span
      suppressHydrationWarning
      aria-label={text}
      className={className}
      style={{ opacity: visible ? 1 : 0 }}
    >
      {output.join("")}
    </span>
  );
}
