"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { getCookie } from "@/utils/cookieUtils";

function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "" });

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
          params: { code },
        }
      );

      if (response.status === 200) {
        const result = response.data;
        const authorization = response.headers["authorization"];
        if (!authorization) {
          throw new Error("서버로부터 유효한 토큰을 받지 못했습니다.");
        }

        const { refreshToken, deviceId, memberId, nickname, isFirstLogin } =
          result;
        const accessToken = authorization.split(" ")[1];

        document.cookie = `refreshToken=${refreshToken}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict; max-age=604800`;
        document.cookie = `deviceId=${deviceId}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict; max-age=604800`;
        document.cookie = `accessToken=${accessToken}; path=/; secure=${
          process.env.NODE_ENV === "production"
        }; samesite=strict; max-age=604800`;

        localStorage.setItem(
          "user",
          JSON.stringify({ memberId, nickname, deviceId })
        );

        if (isFirstLogin) {
          setIsFirstLogin(true);
        } else {
          router.push("/");
        }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/members`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        alert("회원 정보가 성공적으로 업데이트되었습니다.");
        router.push("/");
      } else {
        console.error("정보 업데이트 실패:", response.data);
      }
    } catch (error) {
      console.error("회원 정보 저장 중 오류 발생:", error);
    }
  };

  if (isFirstLogin) {
    return (
      <div>
        <h1>회원 정보 입력</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">이름</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="phone">전화번호</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">저장</button>
        </form>
      </div>
    );
  }

  return <div>로그인 중입니다...</div>;
}

export default KakaoCallback;
