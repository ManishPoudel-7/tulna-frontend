function SkeletonCard() {
  return (
    <div className="bg-cream-soft dark:bg-cream-card-dark rounded-card border border-rule dark:border-rule-dark overflow-hidden">
      <div className="p-5 flex items-center gap-4">
        <div className="w-20 h-20 rounded-full shimmer-bg animate-shimmer flex-shrink-0" />
        <div className="flex-1 space-y-2.5 py-1">
          <div className="h-4 w-3/4 rounded-md shimmer-bg animate-shimmer" />
          <div className="h-3 w-1/4 rounded-md shimmer-bg animate-shimmer" />
          <div className="h-6 w-1/3 rounded-md shimmer-bg animate-shimmer" />
        </div>
      </div>
      <div className="px-5 py-3 border-t border-rule/70 dark:border-rule-dark/70 flex items-center justify-between">
        <div className="h-5 w-40 rounded-full shimmer-bg animate-shimmer" />
        <div className="h-4 w-20 rounded-full shimmer-bg animate-shimmer" />
      </div>
    </div>
  );
}

export default function Skeletons({ count = 5 }) {
  return (
    <div className="space-y-3.5">
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
