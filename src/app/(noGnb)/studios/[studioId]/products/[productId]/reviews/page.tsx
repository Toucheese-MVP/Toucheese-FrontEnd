"use client";

import Image from "next/image";
import { TopBar } from "@/features/common/components/topbar";
import useProductStore from "@/features/product/store/ProductStore";
import { useProductReviews } from "@/features/review/hooks/ProductState";
import ReviewList from "@/features/review/ui/reviewList";
const ReviewsPage = () => {
  const productImage = useProductStore((state) => state.productImage);
  const productTitle = useProductStore((state) => state.productTitle);
  const productDescription = useProductStore(
    (state) => state.productDescription
  );

  const { data: reviews, loading, error } = useProductReviews();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러 발생: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <TopBar />

        <div className="relative aspect-3/4 w-1/3 bg-gray-200 rounded-md shadow-sm overflow-hidden mx-auto">
          <Image
            src={productImage}
            alt={productTitle}
            className="object-cover"
            fill
          />
        </div>

        <h2 className="text-xl font-bold mt-4">
          {productTitle || "상품 제목"}
        </h2>
        <p className="text-gray-700">{productDescription || "상품 설명"}</p>
      </div>
      <ReviewList reviews={reviews || []} />
    </>
  );
};

export default ReviewsPage;
