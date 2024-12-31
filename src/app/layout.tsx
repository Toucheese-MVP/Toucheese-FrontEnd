import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import ClientGNBWrapper from "@/features/common/components/navbar/clientGnbWrapper";
import Loading from "./loading";
import BackgroundWrapper from "./BackgroundWrapper";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "터치즈-맥반윈반",
  description: "스프린트 최종단계",
  icons: {
    icon: "/icon.ico",
    shortcut: "/icon32.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-white`}>
        <Suspense fallback={<Loading />}>
          <main
            className="relative flex flex-col min-h-screen max-w-[var(--max-width)] mx-auto"
            style={{ boxShadow: "0 0 0 1px rgba(209, 213, 219)" }}
          >
            <BackgroundWrapper>
              <div className="pb-28 pt-16 px-4 flex-1 flex flex-col">
                {children}
              </div>
            </BackgroundWrapper>
          </main>
          <ClientGNBWrapper />
        </Suspense>
      </body>
    </html>
  );
}
