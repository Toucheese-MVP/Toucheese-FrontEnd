import { useSignUpStore } from "@/features/members/store/useSignUpStore";

const EmailPasswordForm = ({ onNext }: { onNext: () => void }) => {
  const { email, password, setEmail, setPassword } = useSignUpStore();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">
        로그인을 위한
        <br /> 이메일과 비밀번호를 입력해주세요.
      </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
        className="border p-2  w-full rounded-lg"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
        className="border p-2 w-full mt-2 rounded-lg"
      />
      <button
        onClick={onNext}
        className="w-full py-2 mt-4 bg-yellow-400 text-white"
      >
        다음
      </button>
    </div>
  );
};

export default EmailPasswordForm;
