"use client";

import { use, useEffect } from "react";
import { useStudioDetail } from "@/features/studios/hooks/useStudioDetail";
import { useStudioReviews } from "@/features/review/hooks/useReview";
import { StudioImages } from "@/features/studios/ui/StudioImages";
import StudioSummary from "@/features/studios/ui/StudioSummary";
import { StudioTabs } from "@/features/studios/ui/StudioTabs";
import { StudioProducts } from "@/features/studios/ui/StudioProducts";
import { StudioReviews } from "@/features/studios/ui/StudioReviews";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { TopBar } from "@/features/common/components/topbar";
import useStudioStore from "@/features/studios/store/StudioStore";

function StudioDetailPage({
  params,
}: {
  params: Promise<{ studioId: string }>;
}) {
  const { studioId } = use(params);
  const studioIdNumber = parseInt(studioId, 10);

  const { activeTab, setStudioId, setOperatingHours } = useStudioStore();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  const { data: studioData, loading } = useStudioDetail(studioIdNumber);
  const { data: reviews } = useStudioReviews(studioIdNumber);

  useEffect(() => {
    setStudioId(studioIdNumber);
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [studioIdNumber, setStudioId, setShowGNB, setOperatingHours]);

  if (loading) return <div>로딩 중...</div>;
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
        description={studioData.description}
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
