"use client";

import { ReactNode, useEffect } from "react";
import { useGNBStore } from "@/features/common/store/useGnbStore";

interface ClientWrapperProps {
  children: ReactNode;
}

const ClientWrapper = ({ children }: ClientWrapperProps) => {
  const setShowGNB = useGNBStore((state) => state.setShowGNB);

  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  return (
    <div className="flex-grow w-full flex flex-col gap-4 pb-20">{children}</div>
  );
};

export default ClientWrapper;
