import { cn } from "@/shared/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: string;
  quantity?: number;
  layout?: "flex" | "grid";
  gridColumns?: number;
  gridGap?: string;
  isColumn?: boolean;
}

export function LoadingSkeleton({
  className,
  width = "100%",
  height = "20px",
  rounded = "4px",
  quantity = 1,
  layout = "flex",
  gridColumns = 3,
  gridGap = "gap-4",
  isColumn = false,
}: LoadingSkeletonProps) {
  const skeletonItems = new Array(quantity).fill(null);

  if (layout === "grid") {
    return (
      <div
        className={cn("grid", gridGap, `grid-cols-${gridColumns}`, className)}
      >
        {skeletonItems.map((_, index) => (
          <div
            key={index}
            className={cn("animate-pulse bg-gray-300", className)}
            style={{ width, height, borderRadius: rounded }}
          />
        ))}
      </div>
    );
  }

  const flexDirection = isColumn ? "flex-col" : "flex-row";
  return (
    <div className={cn("flex", flexDirection, gridGap)}>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className={cn("animate-pulse bg-gray-300", className)}
          style={{ width, height, borderRadius: rounded }}
        />
      ))}
    </div>
  );
}
