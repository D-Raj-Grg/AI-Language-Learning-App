import { Skeleton } from "@/components/ui/skeleton";

function MessageSkeleton({ isUser }: { isUser: boolean }) {
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
      <div className={`max-w-[70%] ${isUser ? "items-end" : "items-start"}`}>
        <Skeleton
          className={`h-20 rounded-2xl ${isUser ? "rounded-tr-sm" : "rounded-tl-sm"}`}
        />
      </div>
      {isUser && <Skeleton className="w-8 h-8 rounded-full shrink-0" />}
    </div>
  );
}

export function MessageListSkeleton() {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="container mx-auto max-w-4xl px-4 py-6 space-y-6">
        <MessageSkeleton isUser={false} />
        <MessageSkeleton isUser={true} />
        <MessageSkeleton isUser={false} />
        <MessageSkeleton isUser={true} />
        <MessageSkeleton isUser={false} />
      </div>
    </div>
  );
}
