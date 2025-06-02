import { TopBar } from "@/features/common/components/topbar";
import OrderPage from "@/features/order/ui/orderPage";

export default function orderRouterPage() {
  return (
    <>
      <TopBar message={"주문 / 결제"} showShare={false} />
      <OrderPage />
    </>
  );
}
