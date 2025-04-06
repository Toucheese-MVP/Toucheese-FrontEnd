"use client";

import Image from "next/image";

const handleMenuClick = (menuName: string) => {
  alert(`${menuName} 클릭됨`);
};

const handleLogout = async () => {
  try {
    const cookies = document.cookie.split("; ").reduce(
      (acc, cookie) => {
        const [key, value] = cookie.split("=");
        acc[key] = value;
        return acc;
      },
      {} as Record<string, string>
    );

    const deviceID = cookies["deviceId"];
    const accessToken = cookies["accessToken"];

    if (!deviceID) {
      console.error("deviceID가 없습니다.");
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/tokens/logout?deviceId=${deviceID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("로그아웃 실패");
    }

    // ✅ 클라이언트 쿠키 제거
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "deviceId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    window.location.href = "/members/login";
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};

const MyPageMenuList = () => (
  <div className="mt-4">
    {["예약한", "스크랩한", "리뷰한"].map((type) => (
      <div
        key={type}
        className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
        onClick={() => handleMenuClick(`${type} 스튜디오 리스트`)}
      >
        <span>{`${type} 스튜디오 리스트`}</span>
        <Image
          src="icons/arrow_forward_ios.svg"
          alt="바로가기"
          width={20}
          height={20}
        />
      </div>
    ))}
    <div
      className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
      onClick={handleLogout}
    >
      <span>로그아웃</span>
      <Image
        src="icons/arrow_forward_ios.svg"
        alt="바로가기"
        width={20}
        height={20}
      />
    </div>
    <div
      className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
      onClick={() => handleMenuClick("회원탈퇴")}
    >
      <span className="text-red-500">회원탈퇴</span>
      <Image
        src="icons/arrow_forward_ios.svg"
        alt="회원탈퇴"
        width={20}
        height={20}
      />
    </div>
  </div>
);
export default MyPageMenuList;
