"use client";

import CartList from "@/features/cart/ui/CartPage";
import ClientWrapper from "@/features/common/components/ClientWrapper";
import { TopBar } from "@/features/common/components/topbar";
import { useConceptStore } from "@/features/common/store/useConceptStore";

function CartRoutePage() {
  const { conceptId } = useConceptStore();
  return (
    <ClientWrapper>
      <div className="-mx-4 p-4 flex-">
        <TopBar
          message="장바구니"
          showShare={false}
          showCart={false}
          location={conceptId ? `/studios?conceptId=${conceptId}` : "/"}
        />
        <CartList />
      </div>
    </ClientWrapper>
  );
}
export default CartRoutePage;
