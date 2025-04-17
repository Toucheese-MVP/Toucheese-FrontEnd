"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ContactNewButton() {
  const [showButton, setShowButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setShowButton(false);
      } else {
        setShowButton(true);
      }

      setLastScrollY(currentScrollY);

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowButton(true);
      }, 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  return (
    <div className="fixed z-40 bottom-32 left-0 right-0">
      <div className="max-w-custom mx-auto flex justify-end">
        <Link
          href="/contact/new"
          className={`mr-4 w-12 h-12 text-2xl flex items-center justify-center bg-primary-4 text-white rounded-full font-medium shadow-md hover:bg-primary-6 transition-opacity duration-300 ${
            showButton ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          +
        </Link>
      </div>
    </div>
  );
}
