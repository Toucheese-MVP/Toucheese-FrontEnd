import { useState } from "react";
import { useSignUpStore } from "@/features/members/store/useSignUpStore";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { auth } from "@/lib/firebase"; // Firebase 설정 파일 import

const PhoneVerificationForm = ({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: () => void;
}) => {
  const { phone, setPhone, setVerificationCode, isVerified, setIsVerified } =
    useSignUpStore();
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);

  const sendVerificationCode = async () => {
    const recaptcha = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        recaptcha
      );
      setConfirmation(confirmationResult);
    } catch (error) {
      console.error("인증 요청 실패", error);
    }
  };

  const verifyCode = async () => {
    try {
      await confirmation.confirm(code);
      setIsVerified(true);
      onComplete();
    } catch (error) {
      console.error("인증 실패", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">전화번호 인증</h2>
      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="전화번호 입력"
        className="border p-2 w-full"
      />
      <button
        onClick={sendVerificationCode}
        className="w-full py-2 bg-blue-400 text-white mt-2"
      >
        인증번호 받기
      </button>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="인증번호 입력"
        className="border p-2 w-full mt-2"
      />
      <button
        onClick={verifyCode}
        className="w-full py-2 bg-green-400 text-white mt-2"
      >
        인증 확인
      </button>
      <div id="recaptcha-container"></div>
      <button
        onClick={onBack}
        className="w-full py-2 mt-4 bg-gray-400 text-white"
      >
        뒤로가기
      </button>
    </div>
  );
};

export default PhoneVerificationForm;
