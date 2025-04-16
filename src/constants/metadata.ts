import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "터치즈",
  description:
    "터치즈, 여생 중 찬란한 찰나를 담다. 증명사진부터 감성 스냅까지! 스튜디오 비교·문의·예약을 한 번에 해결하세요. 트렌디한 스튜디오를 모아 당신의 일정과 스타일에 맞게 추천합니다.",
  keywords: [
    "스튜디오 예약",
    "사진 스튜디오",
    "프로필 촬영",
    "감성 스냅",
    "스튜디오 비교",
    "터치즈",
    "스튜디오 플랫폼",
    "트렌디한 스튜디오",
    "촬영 공간",
  ],
  metadataBase: new URL("https://www.toucheese.net"),
  robots: "index, follow",
  alternates: {
    canonical: "https://www.toucheese.net",
  },
  icons: {
    icon: [
      { rel: "icon", url: "/favicon.ico" },
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
  openGraph: {
    type: "website",
    url: "https://www.toucheese.net",
    title: "터치즈 | 나에게 딱 맞는 스튜디오 플랫폼",
    description:
      "트렌디한 스튜디오를 한 곳에! 감각적인 촬영 공간, 나만의 스타일, 간편 비교와 예약까지 – 찰나를 담는 모든 순간을 터치즈에서 경험하세요.",
    siteName: "터치즈",
    images: [
      {
        url: "https://www.toucheese.net/default/sample.png",
        width: 1200,
        height: 630,
        alt: "터치즈 - 원하는 스튜디오를 한 눈에!",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "터치즈 | 원하는 스튜디오를 한 눈에!",
    description:
      "감각적인 촬영을 위한 모든 것! 스튜디오 비교·문의·예약을 터치즈에서 한 번에.",
    images: ["https://www.toucheese.net/default/sample.png"],
  },
};
