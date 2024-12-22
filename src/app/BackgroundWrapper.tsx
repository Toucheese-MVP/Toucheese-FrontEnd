"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const BackgroundWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const grayBackgroundPaths = ["/contact", "/reservation"];
  const isGrayBackground = grayBackgroundPaths.includes(pathname);

  return (
    <div className={isGrayBackground ? "bg-gray-1" : "bg-white"}>
      {children}
    </div>
  );
};

export default BackgroundWrapper;
