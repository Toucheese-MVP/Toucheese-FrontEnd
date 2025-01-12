"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const WelcomePage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center flex-1 pb-20">
      <div className="flex flex-col items-center gap-2 w-full">
        <Image
          src="/celebration.png"
          alt="회원가입을 축하드립니다"
          width={100}
          height={100}
          quality={75}
        />
        <h1 className="text-2xl font-bold mb-4">터치즈에 오신걸 환영합니다!</h1>
        <p className="text-gray-600 text-center mb-6">
          가입이 완료되었습니다. <br />
          터치즈에서 딱 맞는 스튜디오를 찾아보세요.
        </p>
        <button
          onClick={() => router.push("/")}
          className="mt-4 w-full py-4 bg-primary-5 font-bold text-lg rounded-lg "
        >
          스튜디오 둘러보기
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
