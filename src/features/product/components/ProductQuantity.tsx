import useProductOrderStore from "../store/useProductOrderStore";
import Image from "next/image";

interface ProductQuantityProps {
  product: {
    standard: number;
    plusOptionInfo?: {
      isPlusOpt: number;
      plusOptPrice: number;
    };
  };
}

const ProductQuantity = ({ product }: ProductQuantityProps) => {
  const { quantity, setQuantity } = useProductOrderStore();

  const handleIncrease = () => {
    if (quantity < product.standard) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center py-1 text-sm text-gray-4">
        <p>인당가격</p>
        {product.plusOptionInfo?.isPlusOpt && (
          <p>{product.plusOptionInfo.plusOptPrice.toLocaleString()}원</p>
        )}
      </div>
      <div className="flex justify-between items-center text-lg">
        {/* 인원 수 조절 버튼 */}
        <p>추가인원</p>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="p-1 rounded disabled:opacity-30 bg-gray-2"
            disabled={quantity === 0}
          >
            <Image src="/icons/remove.svg" alt="minus" width={16} height={16} />
          </button>
          <span className="min-w-4 text-center">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="p-1 rounded disabled:opacity-30 bg-gray-2"
            disabled={quantity >= product.standard}
          >
            <Image src="/icons/add.svg" alt="plus" width={16} height={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductQuantity;
