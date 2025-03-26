import localFont from "next/font/local";
import "./globals.css";
import { defaultMetadata as metadata } from "@/constants/metadata";
import { Suspense } from "react";
import ClientGNBWrapper from "@/features/common/components/clientGnbWrapper";
import Loading from "./loading";
import BackgroundWrapper from "@/features/common/ui/BackgroundWrapper";

const pretendard = localFont({
  src: [
    {
      path: "../fonts/PretendardVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-pretendard",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard bg-white`}>
        <Suspense fallback={<Loading />}>
          <main className="relative flex flex-col min-h-screen max-w-[var(--max-width)] mx-auto pt-16 shadow-lg">
            <BackgroundWrapper>{children}</BackgroundWrapper>
          </main>
        </Suspense>
        <ClientGNBWrapper />
      </body>
    </html>
  );
}

export { metadata };
