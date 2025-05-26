import localFont from "next/font/local";
import "./globals.css";
import { defaultMetadata as metadata } from "@/constants/metadata";
import { Suspense } from "react";
import ClientGNBWrapper from "@/features/common/components/clientGnbWrapper";
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
        <main className="md:relative md:min-h-screen h-auto max-w-[var(--max-width)] mx-auto pt-16 pb-24 px-4 md:shadow-md">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </main>
        <ClientGNBWrapper />
      </body>
    </html>
  );
}

export { metadata };
