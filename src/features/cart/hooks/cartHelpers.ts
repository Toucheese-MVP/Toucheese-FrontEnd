import { SelectAddOption } from "@/types/Cart.type";
import useRequest from "@/features/common/hooks/useRequest";

export const useCartHelpers = () => {
  const { request } = useRequest();

  const deleteCartItem = async (cartIds: string) => {
    return request("DELETE", `/v1/members/carts/${cartIds}`);
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

  return { deleteCartItem, saveCartItemChanges };
};
