import { useState } from "react";
import Image from "next/image";
import OptionModal from "./OptionModal";
import ConfirmModal from "./ConfirmModal";
import CartItemDetails from "./CartItemDetails";
import { CartItem as CartItemType, SelectAddOption } from "@/types/Cart.type";
import { useCartHelpers } from "../hooks/cartHelpers";

interface CartItemProps {
  item: CartItemType;
  isSelected: boolean;
  onSelect: (cartId: number, isSelected: boolean) => void;
  onSave: (updatedItem: {
    cartId: number;
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[];
  }) => void;
  onDelete: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  isSelected,
  onSelect,
  onSave,
  onDelete,
}) => {
  const [updatePanel, setUpdatePanel] = useState(false);
  const [confirmModal, setConfirmModal] = useState<"delete" | "save" | null>(
    null
  );
  const { deleteCartItem, saveCartItemChanges } = useCartHelpers();

  const handleDelete = async () => {
    try {
      await deleteCartItem(item.cartId);
      onDelete(item.cartId);
    } catch (err) {
      console.error("삭제 실패:", err);
    }
  };

  const handleSaveChanges = async (data: {
    totalPrice: number;
    personnel: number;
    selectAddOptions: SelectAddOption[];
  }) => {
    try {
      await saveCartItemChanges(item.cartId, data);
      onSave({
        cartId: item.cartId,
        totalPrice: data.totalPrice,
        personnel: data.personnel,
        selectAddOptions: data.selectAddOptions,
      });
      setUpdatePanel(false);
    } catch (err) {
      console.error("옵션 업데이트 실패:", err);
    }
  };

  return (
    <>
      <div className="bg-white mb-4 rounded-lg shadow-md overflow-hidden relative p-4">
        <div className="flex items-start gap-4">
          <div className="relative w-32 aspect-3/4 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover"
            />
          </div>

          <CartItemDetails
            studioName={item.studioName}
            productName={item.productName}
            personnel={item.personnel}
            reservationDate={item.reservationDate}
            reservationTime={item.reservationTime}
            totalPrice={item.totalPrice}
            isSelected={isSelected}
            onSelect={(checked) => onSelect(item.cartId, checked)}
          />
        </div>

        <button
          className="bg-gray-100 w-full py-2 border-2 rounded-lg font-semibold text-lg mt-4"
          onClick={() => setUpdatePanel(true)}
        >
          옵션 변경
        </button>

        {updatePanel && (
          <OptionModal
            onClose={() => setUpdatePanel(false)}
            onSave={(data) => {
              const transformedData = {
                totalPrice: data.totalPrice,
                personnel: data.personnel,
                selectAddOptions: data.selectOptions,
              };
              setConfirmModal("save");
              handleSaveChanges(transformedData);
            }}
            initialValues={{
              addOptions: item.addOptions,
              totalPrice: item.totalPrice,
              personnel: item.personnel,
              selectOptions: item.selectAddOptions,
            }}
            cartItem={item}
          />
        )}

        {confirmModal === "delete" && (
          <ConfirmModal
            title="삭제 확인"
            message="정말로 삭제하시겠습니까?"
            onConfirm={handleDelete}
            onCancel={() => setConfirmModal(null)}
          />
        )}
      </div>
    </>
  );
};

export default CartItem;
