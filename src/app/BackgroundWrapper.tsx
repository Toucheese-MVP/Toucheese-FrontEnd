"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BackgroundWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() || "";
  const grayBackgroundPaths = [
    "/contact",
    "/reservation",
    "/cart",
    "/contact/new",
  ];
  const isGrayBackground = grayBackgroundPaths.includes(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={` px-4 pb-36   ${isGrayBackground ? "bg-gray-1 flex-1 flex flex-col" : "bg-white flex-1 flex flex-col"}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundWrapper;
