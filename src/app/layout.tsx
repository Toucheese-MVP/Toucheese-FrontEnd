import localFont from "next/font/local";
import "./globals.css";
import { defaultMetadata as metadata } from "@/constants/metadata";
import { Suspense } from "react";
import Loading from "./loading";
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} font-pretendard bg-white`}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </body>
    </html>
  );
}

export { metadata };
