import ProductQuantity from "./ProductQuantity";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";

interface ProductPriceProps {
  product: ProductDetailItems;
}

const ProductPrice = ({ product }: ProductPriceProps) => (
  <div className="border-t mt-4">
    <div className="flex justify-between items-end py-4">
      <h3 className="text-lg font-semibold">가격</h3>
      <p className="font-bold text-lg">
        <span className="text-sm font-normal text-right text-gray-4 block">
          {product.standard}인 기준
        </span>
        {product.price.toLocaleString()}원
      </p>
    </div>
    {product.plusOptionInfo?.isPlusOpt === 1 && (
      <ProductQuantity product={product} />
    )}
  </div>
);

export default ProductPrice;
