"use client";

import CartPage from "@/features/cart/ui/CartPage";
import { TopBar } from "@/features/common/components/topbar";
import { useConceptStore } from "@/features/common/store/useConceptStore";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { useEffect } from "react";

const CartPageClientWrapper = () => {
  const { conceptId } = useConceptStore();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <>
      <TopBar
        message="장바구니"
        showShare={false}
        showCart={false}
        location={conceptId ? `/studios?conceptId=${conceptId}` : "/"}
      />
      <CartPage />
    </>
  );
};

export default CartPageClientWrapper;
