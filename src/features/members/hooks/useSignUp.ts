import axios from "axios";
import { useState } from "react";

const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<boolean> => {
    event.preventDefault();

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v1/members/signup`, {
        email,
        password,
        name,
        phone,
      });

      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "서버 오류가 발생했습니다.");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("알 수 없는 오류가 발생했습니다.");
      }

      return false; // 실패 시 false 반환
    }
  };

  return {
    email,
    password,
    name,
    phone,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleNameChange,
    handlePhoneChange,
    handleSubmit,
  };
};

export default useSignUp;
