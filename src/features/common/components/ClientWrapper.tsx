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

  return <div className="w-full flex-1 flex flex-col">{children}</div>;
};

export default ClientWrapper;
