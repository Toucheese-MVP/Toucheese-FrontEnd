"use client";

import { useEffect } from "react";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import { TopBar } from "@/features/common/components/topbar";
import ReservationEditView from "@/features/reservation/ui/ReservationEditView";

export default function Page() {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, []);

  return (
    <div className="-mx-4 p-4 flex-1">
      <TopBar message="예약 수정" showCart={false} showShare={false} />
      <ReservationEditView />
    </div>
  );
}
