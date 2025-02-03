import { SelectAddOption } from "@/types/Cart.type";
import useRequest from "@/features/common/hooks/useRequest";

export const useCartHelpers = () => {
  const { request } = useRequest();

  const deleteCartItems = async (cartIds: number[]) => {
    const ids = cartIds.join(",");
    return request("DELETE", `/v1/members/carts/${ids}`);
  };

  const saveCartItemChanges = async (
    cartId: number,
    data: {
      totalPrice: number;
      personnel: number;
      selectAddOptions: SelectAddOption[];
    }
  ) => {
    const apiData = {
      totalPrice: data.totalPrice,
      personnel: data.personnel,
      addOptions: data.selectAddOptions.map((option) => option.selectOptionId),
    };

    return request("PUT", `/v1/members/carts/${cartId}`, apiData);
  };

  return { deleteCartItems, saveCartItemChanges };
};
