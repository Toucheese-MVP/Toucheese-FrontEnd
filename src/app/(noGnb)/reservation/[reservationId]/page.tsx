import { TopBar } from "@/features/common/components/topbar";
import ReservationEditView from "@/features/reservation/ui/ReservationEditView";

export default function Page() {
  return (
    <div className="-mx-4 p-4 flex-1">
      <TopBar message="예약 수정" showCart={false} showShare={false} />
      <ReservationEditView />
    </div>
  );
}
