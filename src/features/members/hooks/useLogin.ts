import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/members`,
        {
          email,
          password,
        }
      );

      const authorization = response.headers["authorization"];
      const { refreshToken, deviceId, memberId, name } = response.data;

      if (!authorization) {
        throw new Error("서버로부터 유효한 토큰을 받지 못했습니다.");
      }

      const accessToken = authorization.split(" ")[1];
      if (!accessToken) {
        throw new Error("토큰 형식이 올바르지 않습니다.");
      }
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
        JSON.stringify({ memberId, name, deviceId })
      );

      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo); // ✅ 로그인 성공 후 리디렉션 처리
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          setError("아이디 또는 비밀번호가 일치하지 않습니다.");
        } else if (error.response?.status === 401) {
          setError("잘못된 이메일 또는 비밀번호입니다.");
        } else {
          setError(
            error.response?.data?.message || "서버 오류가 발생했습니다."
          );
        }
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useLogin;
