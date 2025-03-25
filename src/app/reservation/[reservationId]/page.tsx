"use client";

import { useEffect } from "react";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import ReservationEdit from "@/features/reservation/ui/ReservationEdit";
import { TopBar } from "@/features/common/components/topbar";

function Page() {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <div className="-mx-4 p-4 flex-1">
      <TopBar showShare={false} showCart={false} message="예약 수정" />
      <ReservationEdit />
    </div>
  );
}

export default Page;
