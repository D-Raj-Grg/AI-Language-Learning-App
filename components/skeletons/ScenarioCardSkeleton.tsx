import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function ScenarioCardSkeleton() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50">
      <div className="flex items-start justify-between mb-3">
        <Skeleton className="w-12 h-12 rounded-lg" />
        <Skeleton className="w-20 h-5 rounded-full" />
      </div>
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-5/6" />
    </Card>
  );
}

export function ScenarioGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <ScenarioCardSkeleton key={i} />
      ))}
    </div>
  );
}
