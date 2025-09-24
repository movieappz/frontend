export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-md border overflow-hidden shadow-sm">
      <div className="p-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
      <div className="bg-gray-200 aspect-square w-full" />
    </div>
  );
}
