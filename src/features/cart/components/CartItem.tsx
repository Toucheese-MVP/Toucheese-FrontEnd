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
        <button
          className="absolute right-2 text-gray-5 px-2 mt-4 rounded-lg font-semibold "
          onClick={() => setConfirmModal("delete")}
        >
          삭제
        </button>
        <h1>{item.studioName}</h1>
        <div className=" flex items-start gap-4">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item.cartId, e.target.checked)}
            className="custom-checkbox"
          />
          <div className="relative w-32 aspect-3/4 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover"
            />
          </div>
          <CartItemDetails
            productName={item.productName}
            personnel={item.personnel}
            reservationDate={item.reservationDate}
            reservationTime={item.reservationTime}
            productImage={item.productImage}
            totalPrice={item.totalPrice}
          />
        </div>

        <div className=" pl-10">
          {/* <div className="pl-8">
            <h4 className="text-md font-bold">선택된 옵션:</h4>
            <CartOptionList options={item.selectAddOptions} />
          </div> */}
          <button
            className="bg-gray-100 w-full py-2 border-2 rounded-lg font-semibold text-lg mt-4"
            onClick={() => setUpdatePanel(true)}
          >
            옵션 변경
          </button>
        </div>

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
              selectOptions: item.selectAddOptions, // selectAddOptions → selectOptions
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
