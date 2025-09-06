import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        available: "status-available",
        occupied: "status-occupied",
        reserved: "status-reserved",
        maintenance: "status-maintenance",
      },
    },
    defaultVariants: {
      variant: "available",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusBadgeVariants> {}

function StatusBadge({ className, variant, ...props }: StatusBadgeProps) {
  return (
    <div
      className={cn(statusBadgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { StatusBadge, statusBadgeVariants };
