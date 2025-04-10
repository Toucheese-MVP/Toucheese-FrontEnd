import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";
import useRequest from "@/features/common/hooks/useRequest";
import useProductOrderStore from "../store/useProductOrderStore";
import useStudioStore from "@/features/studios/store/StudioStore";

type AddOption = ProductDetailItems["addOptions"][number];

export function useProductDetail(product: ProductDetailItems) {
  const router = useRouter();
  const { quantity, setOrderData } = useProductOrderStore();
  const studioId = useStudioStore((state) => state.studioId);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedAddOptions, setSelectedAddOptions] = useState<AddOption[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const { request, loading, error } = useRequest();

  useEffect(() => {
    if (error) {
      setAlertMessage(`에러가 발생했습니다: ${error}`);
      setIsAlertOpen(true);
    }
  }, [error]);

  const handleDateTimeSelect = (date: string | null, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const calculateTotalPrice = () => {
    const optionsTotal = selectedAddOptions.reduce(
      (sum, option) => sum + option.price,
      0
    );
    return product.price * quantity + optionsTotal;
  };

  const handleOrder = async () => {
    if (!selectedDate || !selectedTime || !studioId) {
      setAlertMessage("모든 예약 정보를 입력해주세요.");
      setIsAlertOpen(true);
      return;
    }

    const reservationData = {
      productId: product.id,
      studioId,
      totalPrice: calculateTotalPrice(),
      createDate: selectedDate,
      createTime: selectedTime,
      personnel: quantity,
      addOptions: selectedAddOptions.map((option) => option.id),
    };

    try {
      await request(
        "POST",
        `${process.env.NEXT_PUBLIC_API_URL}/v1/members/carts`,
        reservationData
      );

      setAlertMessage(`상품이 성공적으로 예약되었습니다.`);
      setIsAlertOpen(true);

      setOrderData({
        name: product.name,
        productTitle: product.name,
        productImage: product.productImage,
        productId: product.id,
        quantity,
        selectedAddOptions,
        selectedDate,
        totalPrice: calculateTotalPrice(),
      });

      setTimeout(() => {
        router.push("/cart/");
      }, 1500);
    } catch {
      alert("로그인 후 이용 가능한 서비스입니다.");
      const redirectUrl = `/members/login?redirect=/products/${reservationData.productId}`;
      window.location.href = redirectUrl;
      return;
    }
  };

  return {
    selectedDate,
    selectedTime,
    selectedAddOptions,
    isModalOpen,
    setSelectedAddOptions,
    setIsModalOpen,
    handleDateTimeSelect,
    handleCloseModal,
    handleOrder,
    calculateTotalPrice,
    studioId,
    loading,
    alertMessage,
    isAlertOpen,
    setIsAlertOpen,
  };
}
