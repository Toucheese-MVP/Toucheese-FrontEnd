export const StudioDetailSkeleton = () => {
  return (
    <div className="p-4">
      <div className="w-full h-48 bg-gray-300 animate-pulse rounded-lg" />

      <div className="flex items-center gap-4 mt-4">
        <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
        <div className="flex flex-col gap-2">
          <div className="w-24 h-4 bg-gray-300 animate-pulse rounded" />
          <div className="w-48 h-3 bg-gray-300 animate-pulse rounded" />
        </div>
      </div>

      {/* 탭 UI */}
      <div className="flex mt-4 border-b">
        <div className="w-16 h-6 bg-gray-300 animate-pulse rounded" />
        <div className="w-16 h-6 bg-gray-300 animate-pulse rounded ml-4" />
      </div>

      {/* 촬영 상품 스켈레톤 */}
      <div className="mt-6 space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-24 h-24 bg-gray-300 animate-pulse rounded" />
            <div className="flex flex-col gap-2">
              <div className="w-32 h-4 bg-gray-300 animate-pulse rounded" />
              <div className="w-48 h-3 bg-gray-300 animate-pulse rounded" />
              <div className="w-16 h-4 bg-gray-300 animate-pulse rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
