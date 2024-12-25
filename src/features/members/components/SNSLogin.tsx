"use client";

import { KAKAO_LOGIN_URL } from "@/api/kakaoAuth";
import { useRouter } from "next/navigation";

const SNSLogin = () => {
  const router = useRouter();

  const handleKakaoLogin = () => {
    router.push(KAKAO_LOGIN_URL);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center my-5">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-3 text-gray-500 text-sm">SNS 간편 로그인</span>
        <hr className="flex-grow border-gray-300" />
      </div>
      <button
        onClick={handleKakaoLogin}
        className="flex gap-2 items-center justify-center py-3 px-4 border border-kakao bg-kakao rounded-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 20 20"
        >
          <title>kakao 로고</title>
          <path
            d="M9.96 3C5.84 3 2.5 5.59 2.5 8.79c0 1.99 1.29 3.74 3.26 4.78l-.83 3.04c-.07.27.24.48.46.33l3.63-2.41c.31.03.62.05.95.05 4.12 0 7.46-2.59 7.46-5.79 0-3.2-3.34-5.79-7.46-5.79Z"
            fill="black"
          ></path>
        </svg>
        카카오 로그인
      </button>
    </div>
  );
};

export default SNSLogin;
