import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function VocabularyCardSkeleton() {
  return (
    <div>
      <Card className="h-48 p-6 flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 border-2 border-purple-200 dark:border-purple-800">
        <Skeleton className="h-4 w-12 mb-2" />
        <Skeleton className="h-10 w-32 mb-4" />
        <Skeleton className="h-3 w-20" />
      </Card>
      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-7 w-20" />
        </div>
      </div>
    </div>
  );
}

export function VocabularyGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <VocabularyCardSkeleton key={i} />
      ))}
    </div>
  );
}
