import { cn } from "@/lib/utils";

interface Props {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}

export default function MarqueeStrip({
  items,
  speed = 30,
  reverse = false,
  className,
  itemClassName,
  separator = "·",
}: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("overflow-hidden w-full", className)}>
      <div
        className={cn("marquee-track", reverse && "marquee-track-reverse")}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
        aria-hidden="true"
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className={cn(
              "inline-flex items-center gap-6 px-6 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground",
              itemClassName
            )}
          >
            {item}
            <span className="text-foreground/20">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
