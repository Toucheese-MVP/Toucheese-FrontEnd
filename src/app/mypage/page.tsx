"use client";

import { useState, useEffect } from "react";
import { TopBar } from "@/features/common/components/topbar";
import Image from "next/image";
import AlertModal from "@/features/common/components/AlertModal";
import Link from "next/link";
import { useFetchUser } from "@/features/members/hooks/FetchUser";

const MyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, refetch } = useFetchUser();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    phone: string;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await refetch(1); // Passing `1` as an example page number
        if (data) setUser(data);
      } catch (err) {
        console.error("User fetch failed:", err);
      }
    };
    fetchData();
  }, [refetch]);

  const handleMenuClick = (menuName: string) => {
    alert(`${menuName} 클릭됨`);
  };

  const handleLogout = () => {
    document.cookie =
      "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    window.location.href = "/members/login";
  };

  return (
    <div>
      <TopBar
        message="내정보"
        showBack={false}
        showCart={false}
        showShare={false}
      />
      <div className="bg-white p-6 shadow-sm">
        {loading ? (
          <div className="text-center text-gray-500">로딩 중...</div>
        ) : error ? (
          <div className="text-center text-red-500">
            유저 정보를 불러오는 중 오류 발생
          </div>
        ) : user ? (
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center">
              <span className="text-gray-500">사진</span>
            </div>
            <div>
              <div className="font-bold text-lg">{user.name}</div>
              <div className="text-sm text-gray-500">{user.email}</div>
              <div className="text-sm text-gray-500">{user.phone}</div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            유저 정보를 찾을 수 없습니다.
          </div>
        )}
      </div>

      <div className="mt-4">
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer"
          onClick={() => handleMenuClick("예약한 스튜디오 리스트")}
        >
          <span>예약한 스튜디오 리스트</span>
          <span>
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            />
          </span>
        </div>
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={() => handleMenuClick("스크랩한 스튜디오 리스트")}
        >
          <span>스크랩한 스튜디오 리스트</span>
          <span>
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            />
          </span>
        </div>
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={() => handleMenuClick("리뷰한 스튜디오 리스트")}
        >
          <span>리뷰한 스튜디오 리스트</span>
          <span>
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            />
          </span>
        </div>

        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={handleLogout}
        >
          <span>로그아웃</span>
          <span>
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            />
          </span>
        </div>
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={() => handleMenuClick("회원탈퇴")}
        >
          <span className="text-red-500">회원탈퇴</span>
          <span>
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="회원탈퇴"
              width={20}
              height={20}
            />
          </span>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <Link href="/legal/terms">
          <span className="hover:underline">이용약관</span>
        </Link>
        <span className="mx-2">|</span>
        <Link href="/legal/privacy">
          <span className="hover:underline">개인정보처리방침</span>
        </Link>
      </div>

      <AlertModal
        isOpen={isModalOpen}
        message="로그아웃 되었습니다."
        onClose={handleModalClose}
      />
    </div>
  );
};

export default MyPage;
