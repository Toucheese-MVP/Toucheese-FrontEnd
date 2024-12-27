"use client";

import Link from "next/link";
import { Product } from "@/types/Product.type";
import ProductList from "@/features/product/components/ProductList";

export function StudioProducts({ products }: { products: Product[] }) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">촬영 상품</h2>
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <ProductList product={product} />
        </Link>
      ))}
    </div>
  );
}
