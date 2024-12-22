"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import CartSummary from "../components/CartSummary";
import CartItem from "@/features/cart/components/CartItem";

function CartPage() {
  const { cartData, refetch } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const router = useRouter();

  const totalAmount = useMemo(() => {
    const itemsToCalculate = selectedItems.length
      ? cartData?.filter((item) => selectedItems.includes(item.cartId)) || []
      : [];
    return itemsToCalculate.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [selectedItems, cartData]);

  const handleSelect = (cartId: number, isSelected: boolean) => {
    setSelectedItems((prevSelected) => {
      if (isSelected && !prevSelected.includes(cartId)) {
        return [...prevSelected, cartId];
      }
      if (!isSelected && prevSelected.includes(cartId)) {
        return prevSelected.filter((id) => id !== cartId);
      }
      return prevSelected;
    });
  };

  const handleSave = () => {
    refetch();
  };

  const handleDelete = () => {
    refetch();
  };

  const handleOrder = () => {
    const itemsToOrder = selectedItems.length
      ? cartData?.filter((item) => selectedItems.includes(item.cartId)) || []
      : [];
    const cartIds = itemsToOrder.map((item) => item.cartId).join(",");
    router.push(`/order?cartIds=${cartIds}`);
  };

  if (!cartData) return <div>로딩 중...</div>;
  if (cartData.length === 0) return <div>장바구니가 비어 있습니다.</div>;

  return (
    <div>
      <ul>
        {cartData.map((item) => (
          <CartItem
            key={item.cartId}
            item={item}
            isSelected={selectedItems.includes(item.cartId)}
            onSelect={handleSelect}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </ul>
      <div className="mt-4 fixed max-w-custom w-full p-4 left-1/2 bottom-0 -translate-x-1/2">
        <CartSummary
          totalAmount={totalAmount}
          handleOrder={handleOrder}
          isButtonDisabled={selectedItems.length === 0}
        />
      </div>
    </div>
  );
}

export default CartPage;
