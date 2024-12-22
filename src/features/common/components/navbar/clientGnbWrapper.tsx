"use client";

import { usePathname } from "next/navigation";
import { useGNBStore } from "../../store/useGnbStore";
import NavBar from "./Navbar";

const ClientGNBWrapper = () => {
  const showGNB = useGNBStore((state) => state.showGNB);
  const pathname = usePathname();

  const isExcludedPath = pathname.startsWith("/gnb-disabled");
  if (isExcludedPath) return null;

  return showGNB ? <NavBar /> : null;
};

export default ClientGNBWrapper;
