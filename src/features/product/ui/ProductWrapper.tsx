"use client";

import { useEffect } from "react";
import { useProductsDetail } from "@/features/product/hooks/useProducts";
import useProductStore from "@/features/product/store/ProductStore";
import ProductDetail from "../components/ProductDetail";

function ProductWrapper({ productId }: { productId: number }) {
  const { data: product, loading, error } = useProductsDetail(productId);
  const setProductId = useProductStore((state) => state.setProductId);
  const setProductTitle = useProductStore((state) => state.setProductTitle);
  const setProductDescription = useProductStore(
    (state) => state.setProductDescription
  );
  const setProductImage = useProductStore((state) => state.setProductImage);

  useEffect(() => {
    if (!isNaN(productId)) {
      setProductId(productId);
    }
    if (product) {
      setProductTitle(product.name);
      setProductDescription(product.description);
      setProductImage(product.productImage);
    }
  }, [
    productId,
    product,
    setProductId,
    setProductTitle,
    setProductDescription,
    setProductImage,
  ]);

  if (loading) return <div>상품 데이터를 로딩 중입니다...</div>;
  if (error) {
    console.error("Error fetching product data:", error);
    return <div>상품 데이터를 불러오는 중 에러가 발생했습니다: {error}</div>;
  }
  if (!product) return <div>상품이 존재하지 않습니다.</div>;

  return <ProductDetail product={product} />;
}

export default ProductWrapper;
