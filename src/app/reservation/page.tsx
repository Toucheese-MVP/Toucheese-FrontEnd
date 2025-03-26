import { TopBar } from "@/features/common/components/topbar";
import ReservationListView from "@/features/reservation/ui/ReservationListView";

function Page() {
  return (
    <div className="-mx-4 p-4 flex-1">
      <TopBar
        message="예약일정"
        showCart={false}
        showShare={false}
        showBack={false}
      />
      <ReservationListView />
    </div>
  );
}
export default Page;
