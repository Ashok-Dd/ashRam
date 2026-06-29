import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 rounded-full",
  {
    variants: {
      variant: {
        default:     "btn-fill-default border border-foreground",
        outline:     "btn-fill-outline border border-foreground",
        inverted:    "btn-fill-inverted border border-background/30",
        secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors",
        ghost:       "btn-fill-ghost",
        destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors",
        link:        "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-2",
        xs:  "h-6 px-3 text-xs",
        sm:  "h-8 px-4 text-xs",
        lg:  "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
