"use client";

import { TopBar } from "@/features/common/components/topbar";
import Image from "next/image";

const MyPage = () => {
  const handleMenuClick = (menuName: string) => {
    alert(`${menuName} 클릭됨`);
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
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center">
            <span className="text-gray-500">사진</span>
          </div>
          <div>
            <div className="font-bold text-lg">터치즈</div>
            <div className="text-sm text-gray-500">likeil@a.net</div>
            <div className="text-sm text-gray-500">010-0000-0000</div>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer"
          onClick={() => handleMenuClick("예약한 스튜디오 리스트")}
        >
          <span>예약한 스튜디오 리스트</span>
          <span>
            {" "}
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            ></Image>
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
            ></Image>
          </span>
        </div>
        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={() => handleMenuClick("리뷰한 스튜디오 리스트")}
        >
          <span>리뷰한 스튜디오 리스트</span>
          <span>
            {" "}
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            ></Image>
          </span>
        </div>

        <div
          className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
          onClick={() => handleMenuClick("로그아웃")}
        >
          <span>로그아웃</span>
          <span>
            {" "}
            <Image
              src="icons/arrow_forward_ios.svg"
              alt="바로가기"
              width={20}
              height={20}
            ></Image>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
