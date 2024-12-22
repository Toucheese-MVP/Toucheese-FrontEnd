"use client";

import { useGNBStore } from "@/features/common/store/useGnbStore";
import ReservationEdit from "@/features/reservation/ui/ReservationEdit";
import { useEffect } from "react";
import { TopBar } from "@/features/common/components/topbar";

function ReservationEditWrapper({ reservationId }: { reservationId: number }) {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  if (!reservationId) {
    return <div>예약 ID가 존재하지 않습니다.</div>;
  }

  return (
    <div className="bg-gray-100 -mx-4 p-4 flex-1">
      <TopBar showShare={false} showCart={false} message="" />
      <ReservationEdit />
    </div>
  );
}

export default ReservationEditWrapper;
