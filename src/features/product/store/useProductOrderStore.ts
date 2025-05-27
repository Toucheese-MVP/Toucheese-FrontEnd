import { create } from "zustand";

interface ProductOrderState {
  productTitle: string;
  productId: number | null;
  productImage: string;
  quantity: number;
  selectedAddOptions: { name: string; price: number }[];
  selectedDate: string | null;
  totalPrice: number;
  setQuantity: (value: number) => void;
  setOrderData: (data: {
    name: string | undefined;
    productTitle: string;
    productImage: string;
    productId: number;
    quantity: number;
    selectedAddOptions: { name: string; price: number }[];
    selectedDate: string | null;
    totalPrice: number;
  }) => void;
}

const useProductOrderStore = create<ProductOrderState>((set) => ({
  productTitle: "",
  productId: null,
  productImage: "",
  quantity: 0,
  selectedAddOptions: [],
  selectedDate: null,
  totalPrice: 0,
  customerName: "",
  phone: "",
  setQuantity: (value) => set({ quantity: value }),
  setOrderData: (data) =>
    set({
      productImage: data.productImage,
      productTitle: data.name,
      productId: data.productId,
      quantity: data.quantity,
      selectedAddOptions: data.selectedAddOptions,
      selectedDate: data.selectedDate,
      totalPrice: data.totalPrice,
    }),
}));

export default useProductOrderStore;
