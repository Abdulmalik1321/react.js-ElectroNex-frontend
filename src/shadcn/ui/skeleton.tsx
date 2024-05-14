import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse delay-100 rounded-md bg-card", className)}
      {...props}
    />
  );
}

export { Skeleton };

function SkeletonTow({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-md bg-foreground opacity-10", className)}
      {...props}
    />
  );
}

export { SkeletonTow };
