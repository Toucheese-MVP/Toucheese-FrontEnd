"use client";

import { useEffect, useState } from "react";
import { useReviewDetail } from "@/features/review/hooks/useReviewDetail";
import ReviewDetail from "@/features/review/ui/reviewDetail";
import { TopBar } from "@/features/common/components/topbar";

function ReviewDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [reviewId, setReviewId] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setReviewId(parseInt(resolvedParams.id, 10));
    });
  }, [params]);

  const { data: review, error } = useReviewDetail(reviewId ?? 0);

  if (!reviewId) return <div>리뷰 ID를 불러오는 중입니다...</div>;

  if (error)
    return <div>리뷰 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  if (!review) return <div>리뷰 데이터가 없습니다.</div>;

  return (
    <>
      <TopBar showShare={false} />
      <ReviewDetail review={review} />
    </>
  );
}

export default ReviewDetailPage;
