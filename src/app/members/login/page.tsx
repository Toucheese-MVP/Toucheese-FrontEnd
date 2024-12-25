"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGNBStore } from "@/features/common/store/useGnbStore";
import useLogin from "@/features/members/hooks/useLogin";
import Image from "next/image";
import Link from "next/link";

function LoginPage() {
  const router = useRouter();
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();
  const setShowGNB = useGNBStore((state) => state.setShowGNB);
  useEffect(() => {
    setShowGNB(false);
    return () => setShowGNB(true);
  }, [setShowGNB]);

  const handleKakao = () => {
    router.push(
      `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&response_type=code`
    );
  };

  return (
    <div className="flex-grow w-full left-0 top-0 bottom-0 right-0 flex flex-col justify-center gap-4 p-4 pb-20">
      <div className="relative flex flex-col gap-4 ">
        <Image
          src="/symbols/toucheese_font_logo.svg"
          alt="터치즈"
          width={200}
          height={100}
        />
        <div>
          <p className="text-lg font-bold">스튜디오 고민은 그만!</p>
          <p className="text-md font-medium text-gray-700">
            터치즈에 로그인하고 스튜디오를 한 눈에 살펴보세요.
          </p>
        </div>
      </div>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="font-medium hidden">
              이메일
            </label>
            <input
              type="text"
              id="email"
              className="w-full px-3 py-4 border rounded-lg outline-none focus:border-primary-5"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력하세요"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="font-medium hidden">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-4 border rounded-lg outline-none focus:border-primary-5"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요"
              required
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between text-black">
            <div className="flex gap-2 ">
              <input type="checkbox" />
              <label htmlFor="password" className="font-medium">
                자동로그인
              </label>
            </div>
            <div className="flex ">
              <Link href="javascript:;">회원가입</Link>
              <span>/</span>
              <Link href="javascript:;">ID·PASSWORD 찾기</Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-primary-5 font-bold py-3 rounded-lg"
          >
            로그인
          </button>
        </form>

        <div className="flex flex-col">
          <div className="flex items-center my-5">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 text-sm">SNS 간편 로그인</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            onClick={handleKakao}
            className="flex gap-1 borderborder-kakao bg-kakao items-center justify-center py-3 px-4 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <title>kakao 로고</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.96052 3C5.83983 3 2.5 5.59377 2.5 8.79351C2.5 10.783 3.79233 12.537 5.75942 13.5807L4.9313 16.6204C4.85835 16.8882 5.1634 17.1029 5.39883 16.9479L9.02712 14.5398C9.33301 14.5704 9.64386 14.587 9.96052 14.587C14.0812 14.587 17.421 11.9932 17.421 8.79351C17.421 5.59377 14.0812 3 9.96052 3Z"
                fill="black"
              ></path>
            </svg>
            카카오 로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
