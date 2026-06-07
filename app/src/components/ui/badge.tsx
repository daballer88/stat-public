import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs font-medium tracking-wider transition-colors",
  {
    variants: {
      variant: {
        default: "border-border bg-card/70 text-muted-foreground backdrop-blur-md",
        primary: "border-primary/30 bg-primary/10 text-indigo-300",
        live: "border-traits/30 bg-traits/10 text-traits",
        soon: "border-tangent/40 bg-tangent/10 text-tangent uppercase",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
