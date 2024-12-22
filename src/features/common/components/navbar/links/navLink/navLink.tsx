"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface NavLinkProps {
  item: {
    title: string;
    path: string;
    icon: string;
  };
}

const NavLink = ({ item }: NavLinkProps) => {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isActive = isClient && pathname === item.path;
  const iconPath = isActive
    ? item.icon.replace(".svg", "_fill.svg") // 활성화 상태 아이콘 경로
    : item.icon;

  return (
    <Link
      href={item.path}
      className={`flex flex-col items-center text-center font-medium transition-colors duration-200 rounded-2xl ${
        isActive ? "text-primary-5" : "text-gray-8"
      }`}
    >
      <Image src={iconPath} alt={`${item.title} icon`} width={30} height={30} />
      <p>{item.title}</p>
    </Link>
  );
};

export default NavLink;
