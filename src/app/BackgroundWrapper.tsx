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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className={`flex-1 ${isGrayBackground ? "bg-gray-1" : "bg-white"}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundWrapper;
