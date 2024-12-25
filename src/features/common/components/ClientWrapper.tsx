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
    // flex-grow w-full flex flex-col justify-center gap-4 p-4 pb-20
    <div className="">{children}</div>
  );
};

export default ClientWrapper;
