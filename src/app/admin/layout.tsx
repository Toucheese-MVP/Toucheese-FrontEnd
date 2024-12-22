"use client";

import { useGNBStore } from "@/features/common/store/useGnbStore";
import { useEffect } from "react";
import SideMenuBar from "./ui/SideMenuBar";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <div className="md:fixed flex left-0 top-0 bottom-0 right-0 z-50 max-w-screen-xl w-full m-auto ">
      <SideMenuBar />
      <div className="flex-1 bg-gray-100 md:p-4 py-28 px-4 md:overflow-y-scroll ">
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
