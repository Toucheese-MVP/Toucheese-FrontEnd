import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import ClientGNBWrapper from "@/features/common/components/navbar/clientGnbWrapper";
import Loading from "./loading";
import BackgroundWrapper from "./BackgroundWrapper";

const pretendard = localFont({
  src: [{ path: "../fonts/PretendardVariable.woff2", weight: "45 920" }],
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "터치즈",
  description:
    "스튜디오 고민은 그만! 터치즈에서 원하는 스튜디오를 한 눈에 살펴보고 예약하세요!",
  icons: {
    icon: [
      { rel: "icon", url: "/favicons/favicon-16x16.png", sizes: "16x16" },
      { rel: "icon", url: "/favicons/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        url: "/favicons/apple-icon-180x180.png",
        sizes: "180x180",
      },
    ],
  },
  manifest: "/manifest.json",
  other: {
    viewport:
      "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} bg-white`}
        style={{
          fontFamily:
            "var(--pretendard), -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        }}
      >
        <Suspense fallback={<Loading />}>
          <main
            className="relative flex flex-col min-h-screen max-w-[var(--max-width)] mx-auto pt-16"
            style={{ boxShadow: "0 0 0 1px rgba(209, 213, 219)" }}
          >
            <BackgroundWrapper>{children}</BackgroundWrapper>
          </main>
          <ClientGNBWrapper />
        </Suspense>
      </body>
    </html>
  );
}
