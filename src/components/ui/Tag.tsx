import { cn } from "@/lib/utils";

interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full select-none cursor-default",
        "text-[10px] font-medium uppercase tracking-[0.12em]",
        // Rest state: faint tinted pill
        "border border-foreground/15 text-foreground/55",
        "tag-fill",
        className,
      )}
    >
      {/* Small dot indicator */}
      <span className="w-1 h-1 rounded-full bg-current opacity-60 shrink-0" aria-hidden="true" />
      {children}
    </span>
  );
}
