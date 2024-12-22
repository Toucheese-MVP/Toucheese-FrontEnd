"use client";

import NavLink from "./navLink/navLink";

const Links = () => {
  const links = [
    { title: "홈", path: "/", icon: "/icons/nav/home.svg" },
    { title: "예약일정", path: "/reservation", icon: "/icons/nav/event.svg" },
    { title: "문의하기", path: "/contact", icon: "/icons/nav/forum.svg" },
    { title: "내정보", path: "/mypage", icon: "/icons/nav/account_circle.svg" },
  ];

  return (
    <nav className="flex justify-around gap-4 py-4">
      {links.map((link) => (
        <NavLink key={link.title} item={link} />
      ))}
    </nav>
  );
};

export default Links;
