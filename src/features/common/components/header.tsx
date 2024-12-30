"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <header className="relative flex items-center justify-center my-6 w-full">
      {pathname !== "/" && (
        <Link className="absolute -left-2" href="/">
          <Image
            src="/icons/arrow_back_ios_new.svg"
            alt="back"
            width={36}
            height={36}
            style={{ height: "auto" }}
          />
        </Link>
      )}
      <Link href="/">
        <Image
          src="/symbols/toucheese_font_logo.svg"
          alt="터치즈"
          width={250}
          height={100}
          priority
          loading="eager"
          style={{ height: "auto" }}
        />
      </Link>
    </header>
  );
}

export default Header;
