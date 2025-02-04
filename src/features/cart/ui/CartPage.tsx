"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import CartSummary from "../components/CartSummary";
import CartItem from "@/features/cart/components/CartItem";
import ConfirmModal from "../components/ConfirmModal";
import { useCartHelpers } from "../hooks/cartHelpers";

function CartList() {
  const { cartData, refetch } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null); 
  const { deleteCartItems } = useCartHelpers();
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

  const handleDelete = async () => {
    const itemsToDelete =
      confirmDelete === -1 ? selectedItems : [confirmDelete!];

    if (itemsToDelete.length === 0) return;

    try {
      await deleteCartItems(itemsToDelete);
      setSelectedItems((prev) =>
        prev.filter((id) => !itemsToDelete.includes(id))
      );
      setConfirmDelete(null);
      refetch();
    } catch (err) {
      console.error("삭제 중 오류:", err);
      alert("항목 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleSave = () => {
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
      <div className="flex my-2 p-2 bg-white rounded-lg items-center">
        <p className="text-sm font-medium">
          선택된 항목: {selectedItems.length}개
        </p>
        <button
          onClick={() => setConfirmDelete(-1)}
          disabled={selectedItems.length === 0}
          className="bg-primary-5 text-white px-4 py-2 rounded ml-auto disabled:bg-gray-300"
        >
          선택 항목 삭제
        </button>
      </div>
      <ul>
        {cartData.map((item) => (
          <CartItem
            key={item.cartId}
            item={item}
            isSelected={selectedItems.includes(item.cartId)}
            onSelect={handleSelect}
            onSave={handleSave}
            onDelete={() => setConfirmDelete(item.cartId)}
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

      {confirmDelete !== null && (
        <ConfirmModal
          title="삭제 확인"
          message={
            confirmDelete === -1
              ? "선택한 항목을 삭제하시겠습니까?"
              : "이 항목을 삭제하시겠습니까?"
          }
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
}

export default CartList;
