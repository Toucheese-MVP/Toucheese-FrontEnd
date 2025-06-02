"use client";

import { useEffect, useState } from "react";
import ProductWrapper from "@/features/product/ui/ProductWrapper";
import { TopBar } from "@/features/common/components/topbar";

function ProductRoutePage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const [productId, setProductId] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      const productIdNumber = parseInt(resolvedParams.productId, 10);
      setProductId(productIdNumber);
    });
  }, [params]);

  if (productId === null) {
    return (
      <div className="text-center">상품 데이터를 불러오는 중입니다...</div>
    );
  }

  return (
    <>
      <TopBar showShare={false} showCart={false} message="상품상세" />
      <ProductWrapper productId={productId} />
    </>
  );
}

export default ProductRoutePage;
