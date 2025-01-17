import { useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { CheckoutResponse } from "@/types/Checkout.type";

function useFetchCheckoutData(cartIds: string | null) {
  const { data, loading, error, request } = useRequest<CheckoutResponse>();

  useEffect(() => {
    if (!cartIds) return;

    const fetchData = async () => {
      try {
        await request(
          "GET",
          `/v1/members/carts/checkout-items`,
          undefined,
          new URLSearchParams({ cartIds })
        );
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [cartIds, request]);

  return {
    data: data
      ? {
          cartPaymentList: data.CheckoutCartItems || [],
          memberContactInfo: data.memberContactInfo || {
            email: "",
            name: "",
            phone: "",
          },
        }
      : null,
    loading,
    error,
  };
}

export default useFetchCheckoutData;
