import { cn } from "@/shared/lib/utils";

interface BadgeProps {
  label: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Badge({ label, className, variant = "default", size = "md" }: BadgeProps) {
  const isSubtle = variant === "subtle";

  const sizeClasses = {
    xs: "text-xs py-1 px-2",
    sm: "text-sm py-1 px-2.5",
    md: "text-sm py-1.5 px-3",
    lg: "text-base py-2 px-4",
    xl: "text-lg py-2.5 px-5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full",
        sizeClasses[size],
        !isSubtle && "bg-[var(--primary)] text-[var(--primary-foreground)]",
        isSubtle && "bg-[var(--foreground)]/5 text-[var(--foreground)]/90",
        className,
      )}
    >
      {label}
    </span>
  );
}
