"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      handleKakaoCallback(code);
    }
  }, [code]);

  const handleKakaoCallback = async (code: string) => {
    try {
      console.log("Kakao 인증 코드:", code);

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/kakao/callback`,
        {
          params: { code },
        }
      );

      console.log("API 응답:", response);

      if (response.status === 200) {
        const result = response.data;
        console.log("API 응답 데이터:", result);

        const authorization = response.headers["authorization"];
        console.log("Authorization 헤더:", authorization);

        if (!authorization) {
          throw new Error("서버로부터 유효한 토큰을 받지 못했습니다.");
        }

        const { refreshToken, deviceId, memberId, name } = result;
        const accessToken = authorization.split(" ")[1];

        document.cookie = `refreshToken=${refreshToken}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict; max-age=604800`;
        document.cookie = `deviceId=${deviceId}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict; max-age=604800`;
        localStorage.setItem("accessToken", accessToken);

        localStorage.setItem(
          "user",
          JSON.stringify({ memberId, name, deviceId })
        );

        router.push("/");
      } else {
        console.error("로그인 실패:", response.data);
      }
    } catch (error) {
      console.error("요청 중 에러 발생:", error);

      if (axios.isAxiosError(error) && error.response) {
        console.error("응답 에러 데이터:", error.response.data);
      }
    }
  };

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
