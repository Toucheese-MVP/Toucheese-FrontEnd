"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const BackgroundWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const grayBackgroundPaths = ["/contact", "/reservation", "/cart"];
  const isGrayBackground = grayBackgroundPaths.includes(pathname);

  return (
    <div
      className={`max-w-custom m-auto ${isGrayBackground ? "bg-gray-1" : "bg-white"}`}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapper;
