"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function SideMenuBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <button
        onClick={toggleSidebar}
        className=" fixed top-4 left-4 z-20 bg-gray-900 text-white p-2 rounded"
      >
        {isOpen ? "메뉴닫기" : "메뉴열기"}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 "
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-4 flex flex-col transform transition-transform duration-300 z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <nav>
          <ul>
            <li>
              <Link href="/admin" className="block py-2">
                <h1 className="font-bold text-2xl">TOUCHEESE ADMIN</h1>
              </Link>
            </li>
            <li>
              <Link href="/admin/reservation" className="block py-2">
                예약일정확인
              </Link>
            </li>
            <li>
              <Link href="/admin/contact" className="block py-2">
                문의내역확인
              </Link>
            </li>
          </ul>
        </nav>
        <Link
          href="/"
          className="mt-auto py-2 px-2 bg-gray-400 rounded-lg text-center hover:bg-gray-500"
        >
          관리자페이지 나가기
        </Link>
      </aside>
    </>
  );
}

export default SideMenuBar;
