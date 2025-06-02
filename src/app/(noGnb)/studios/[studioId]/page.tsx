"use client";

import { use, useEffect } from "react";
import { useStudioDetail } from "@/features/studios/hooks/useStudioDetail";
import { useStudioReviews } from "@/features/review/hooks/useReview";
import { StudioImages } from "@/features/studios/components/StudioImages";
import StudioSummary from "@/features/studios/components/StudioSummary";
import { StudioTabs } from "@/features/studios/components/StudioTabs";
import { StudioProducts } from "@/features/studios/components/StudioProducts";
import { StudioReviews } from "@/features/studios/ui/StudioReviews";
import { TopBar } from "@/features/common/components/topbar";
import useStudioStore from "@/features/studios/store/StudioStore";
import { StudioDetailSkeleton } from "@/features/common/components/StudioSkeletonLoader";

function StudioDetailPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = use(params);
  const studioIdNumber = parseInt(studioId, 10);

  const { activeTab, setStudioId, setOperatingHours } = useStudioStore();
  const { data: studioData, loading } = useStudioDetail(studioIdNumber);
  const { data: reviews } = useStudioReviews(studioIdNumber);

  useEffect(() => {
    setStudioId(studioIdNumber);
  }, [studioIdNumber, setStudioId, setOperatingHours]);

  if (loading) {
    return <StudioDetailSkeleton />;
  }
  if (!studioData) return <div>스튜디오 정보를 불러올 수 없습니다.</div>;

  return (
    <>
      <TopBar showShare={true} showCart={false} />
      <StudioImages facilityImageUrls={studioData.facilityImageUrls} />
      <StudioSummary
        profileImage={studioData.profileImage}
        name={studioData.name}
        totalReviews={studioData.products.reduce(
          (sum, p) => sum + p.reviewCount,
          0
        )}
        notice={studioData.notice}
        address={studioData.address}
        operatingHours={studioData.operatingHours}
      />
      <StudioTabs />
      {activeTab === "가격" && (
        <StudioProducts products={studioData.products} />
      )}
      {activeTab === "리뷰" && <StudioReviews reviews={reviews} />}
    </>
  );
}

export default StudioDetailPage;
