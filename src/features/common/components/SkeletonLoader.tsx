export const SkeletonLoader = ({
  itemCount = 2,
  showImage = true,
  showText = true,
}: {
  itemCount?: number;
  showImage?: boolean;
  showText?: boolean;
}) => {
  return (
    <>
      {Array.from({ length: itemCount }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 border-b-8 py-4 border-gray-1 animate-pulse"
        >
          {showText && <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>}

          {showImage && (
            <div className="w-full max-w-[600px] h-40 bg-gray-200 rounded-md"></div>
          )}

          <div className="flex gap-4">
            <div className="h-6 w-20 bg-gray-200 rounded-md"></div>
            <div className="h-6 w-32 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      ))}
    </>
  );
};
