import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard({ size = "250px" }) {
  return (
    <div className="flex flex-col space-y-3" style={{ width: size }}>
      <Skeleton className="h-[220px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
