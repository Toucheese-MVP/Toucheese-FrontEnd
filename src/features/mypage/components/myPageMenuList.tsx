"use client";

import { useEffect, useState } from "react";
import { MenuItem } from "./myPageMenuItem";
import { getCookie } from "@/utils/cookieUtils/cookieUtils";

const handleLogout = async () => {
  try {
    const deviceId = getCookie("deviceId");
    const accessToken = getCookie("accessToken");

    if (!deviceId) {
      console.error("deviceID가 없습니다.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/tokens/logout?deviceId=${deviceId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) throw new Error("로그아웃 실패");

    ["accessToken", "deviceId", "refreshToken"].forEach((key) => {
      document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    });
    alert("로그아웃 되었습니다.");
    window.location.href = "/members/login";
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};

const MyPageMenuList = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    setIsLoggedIn(!!accessToken);
  }, []);
  const studioTypes = ["예약한", "스크랩한", "리뷰한"];

  return (
    <div className="mt-4">
      {studioTypes.map((type) => (
        <MenuItem
          key={type}
          label={`${type} 스튜디오 리스트`}
          onClick={() => alert(`${type} 스튜디오 리스트 클릭됨`)}
        />
      ))}

      {isLoggedIn && (
        <>
          <MenuItem label="로그아웃" onClick={handleLogout} />
          <MenuItem
            label="회원탈퇴"
            onClick={() => alert("회원탈퇴 클릭됨")}
            highlight
          />
        </>
      )}
    </div>
  );
};

export default MyPageMenuList;
