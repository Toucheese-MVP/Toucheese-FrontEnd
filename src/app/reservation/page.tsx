import { TopBar } from "@/features/common/components/topbar";
import ReservationPage from "@/features/reservation/ui/ReservationPage";

function ReservationRouterPage() {
  return (
    <div className="-mx-4 p-4 flex-1">
      <TopBar
        message="예약일정"
        showCart={false}
        showShare={false}
        showBack={false}
      />
      <ReservationPage />
    </div>
  );
}
export default ReservationRouterPage;
