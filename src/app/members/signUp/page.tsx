"use client";

import useSignUp from "@/features/members/hooks/useSignUp";
import { TopBar } from "@/features/common/components/topbar";
import { useState } from "react";
import { useRouter } from "next/navigation";
const SignUpPage = () => {
  const {
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
  } = useSignUp();
  const router = useRouter();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputErrors, setInputErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setInputErrors((prev) => ({
      ...prev,
      confirmPassword:
        e.target.value !== password ? "비밀번호가 일치하지 않습니다." : "",
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasError = false;

    if (!emailRegex.test(email)) {
      setInputErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식을 입력하세요.",
      }));
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, email: "" }));
    }

    if (!passwordRegex.test(password)) {
      setInputErrors((prev) => ({
        ...prev,
        password:
          "비밀번호는 최소 8자 이상이어야 하며, 문자와 숫자를 포함해야 합니다.",
      }));
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, password: "" }));
    }

    if (password !== confirmPassword) {
      setInputErrors((prev) => ({
        ...prev,
        confirmPassword: "비밀번호가 일치하지 않습니다.",
      }));
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }

    if (!/^\d{10,11}$/.test(phone)) {
      setInputErrors((prev) => ({
        ...prev,
        phone: "전화번호는 10~11자리 숫자로 입력해야 합니다.",
      }));
      hasError = true;
    } else {
      setInputErrors((prev) => ({ ...prev, phone: "" }));
    }

    if (hasError) return;

    const success = await handleSubmit(e);
    if (success) {
      router.push("/welcome");
    }
  };

  return (
    <>
      <TopBar message="회원가입" showCart={false} showShare={false} />
      <div className="flex flex-col">
        <p className="text-xl font-semibold mb-6">
          로그인을 위한 <br />
          이메일과 비밀번호를 입력해주세요.
        </p>
        <form onSubmit={handleFormSubmit} className="space-y-4 w-full">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              placeholder="이름을 입력하세요."
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              전화번호
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="전화번호를 입력하세요. (숫자만 입력)"
              className={`mt-1 w-full px-3 py-2 border ${
                inputErrors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              required
            />
            {inputErrors.phone && (
              <p className="text-sm text-red-500">{inputErrors.phone}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="이메일을 입력하세요."
              className={`mt-1 w-full px-3 py-2 border ${
                inputErrors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              required
            />
            {inputErrors.email && (
              <p className="text-sm text-red-500">{inputErrors.email}</p>
            )}
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="비밀번호를 입력하세요."
              className={`mt-1 w-full px-3 py-2 border ${
                inputErrors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              required
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "숨기기" : "보기"}
            </button>
            {inputErrors.password && (
              <p className="text-sm text-red-500">{inputErrors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="비밀번호를 다시 입력하세요."
              className={`mt-1 w-full px-3 py-2 border ${
                inputErrors.confirmPassword
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md focus:ring-primary-500 focus:border-primary-500`}
              required
            />
            {inputErrors.confirmPassword && (
              <p className="text-sm text-red-500">
                {inputErrors.confirmPassword}
              </p>
            )}
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500"
          >
            다음
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUpPage;
