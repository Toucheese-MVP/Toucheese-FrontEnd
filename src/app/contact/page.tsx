import { TopBar } from "@/features/common/components/topbar";
import ContactList from "@/features/contact/ui/ContactList";
import { getQuestionsList } from "@/features/contact/hooks/getQuestionList";
import type { Metadata } from "next";

// 페이지 전용 메타데이터 정의
export const metadata: Metadata = {
  title: "터치즈 | 문의하기",
  description:
    "터치즈에 대해 궁금한 점이 있으신가요? 문의를 남겨주시면 빠르게 답변해드립니다. 서비스 사용 중 불편하거나 개선이 필요한 부분도 자유롭게 알려주세요.",
  openGraph: {
    title: "터치즈 | 문의하기",
    description:
      "터치즈 서비스에 대한 궁금증이나 개선 제안을 남겨보세요. 고객의 소중한 의견을 바탕으로 더 나은 서비스를 만들어갑니다.",
    url: "https://toucheese.shop/contact",
    images: [
      {
        url: "https://toucheese.shop/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "터치즈 문의하기 페이지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "터치즈 | 문의하기",
    description:
      "터치즈 이용 중 궁금한 점은 언제든지 문의해주세요. 사용자 의견을 소중히 생각합니다.",
    images: ["https://toucheese-macwin.store/images/og-image.jpg"],
  },
  alternates: {
    canonical: "https://toucheese-macwin.store/contact",
  },
};

async function Page() {
  const response = await getQuestionsList(1);
  return (
    <div className="-mx-4 p-4 pb-20 flex-1">
      <TopBar
        message="문의하기"
        showBack={false}
        showCart={false}
        showShare={false}
      />
      <ContactList initialData={response} />
    </div>
  );
}

export default Page;
