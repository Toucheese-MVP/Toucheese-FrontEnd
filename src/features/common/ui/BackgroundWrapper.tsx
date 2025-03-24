"use client";

import { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useGrayBackground } from "../hooks/useGrayBackground";

const BackgroundWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isGrayBackground = useGrayBackground(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`px-4 pb-36 ${
          isGrayBackground ? "bg-gray-1" : "bg-white"
        } flex-1 flex flex-col`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default BackgroundWrapper;
