"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center absolute top-0 bottom-24 left-0 right-0 max-w-[var(--max-width)]">
      <h1>에러가 발생했습니다.</h1>

      <button onClick={reset}>다시 시도</button>
    </div>
  );
}
