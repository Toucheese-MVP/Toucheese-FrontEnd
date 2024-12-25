import useLogin from "../hooks/useLogin";
import Link from "next/link";

const LoginForm = () => {
  const {
    email,
    password,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="sr-only">
          이메일
        </label>
        <input
          type="text"
          id="email"
          className="w-full px-3 py-4 border rounded-lg outline-none focus:border-primary-5"
          value={email}
          onChange={handleEmailChange}
          placeholder="이메일을 입력하세요"
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="sr-only">
          비밀번호
        </label>
        <input
          type="password"
          id="password"
          className="w-full px-3 py-4 border rounded-lg outline-none focus:border-primary-5"
          value={password}
          onChange={handlePasswordChange}
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="flex justify-between text-black">
        <div className="flex gap-2">
          <input type="checkbox" />
          <label className="font-medium">자동로그인</label>
        </div>
        <div className="flex space-x-2">
          <Link href="#">회원가입</Link>
          <span>/</span>
          <Link href="#">ID·PASSWORD 찾기</Link>
        </div>
      </div>
      <button
        type="submit"
        className="w-full bg-primary-5 font-bold py-3 rounded-lg"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
