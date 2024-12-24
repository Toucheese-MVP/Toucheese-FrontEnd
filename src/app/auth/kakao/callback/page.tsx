"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/kakao/callback?code=${code}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("로그인 성공:", result);

        // Extract tokens and user information
        const { accessToken, refreshToken, deviceId, memberId, name } = result;

        // Store tokens and user information
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

        // Redirect to the main page
        router.push("/");
      } else {
        const errorData = await response.json();
        console.error("로그인 실패:", errorData);
      }
    } catch (error) {
      console.error("요청 중 에러 발생:", error);
    }
  };

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
