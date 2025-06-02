import LoginForm from "@/features/members/ui/LoginForm";
import SNSLogin from "@/features/members/components/SNSLogin";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="my-auto">
      <Image
        src="/symbols/toucheese_font_logo.svg"
        alt="터치즈"
        width={200}
        height={100}
      />
      <div className="my-2">
        <p className="text-lg font-bold">스튜디오 고민은 그만!</p>
        <p className="text-md font-medium text-gray-700">
          터치즈에 로그인하고 스튜디오를 한 눈에 살펴보세요.
        </p>
      </div>
      <LoginForm />
      <SNSLogin />
      <Link
        href="/"
        className="text-center block mt-20 text-sm text-gray-500 underline"
      >
        비로그인으로 둘러보기
      </Link>
    </div>
  );
};

export default LoginPage;
