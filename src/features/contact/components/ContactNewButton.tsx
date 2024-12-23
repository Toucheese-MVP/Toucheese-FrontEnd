"use client";

import { useRouter } from "next/navigation";

function ContactNewButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push("contact/new");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-32 left-1/2 -translate-x-1/2 max-w-52 bg-primary-5 py-3 px-6 rounded-lg text-lg font-bold"
    >
      + 문의 작성하기
    </button>
  );
}

export default ContactNewButton;
