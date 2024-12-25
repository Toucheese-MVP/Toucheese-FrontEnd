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
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/kakao/callback`,
        {
          params: { code }, // Query parameter로 전달
        }
      );

      if (response.status === 200) {
        const result = response.data;
        const authorization = response.headers["authorization"];
        console.log("로그인 성공:", result);

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

        // Redirect to the main page
        router.push("/");
      } else {
        console.error("로그인 실패:", response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios 에러:", error.response?.data || "알 수 없는 오류");
      } else {
        console.error("요청 중 에러 발생:", error);
      }
    }
  };

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
