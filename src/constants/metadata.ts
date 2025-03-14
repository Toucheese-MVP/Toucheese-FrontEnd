import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
  title: "터치즈 | 원하는 스튜디오를 한 눈에!",
  description:
    "스튜디오 고민은 이제 그만! 터치즈에서 원하는 스튜디오를 쉽게 찾아보고 예약하세요. 다양한 스튜디오 정보와 사용자 리뷰를 한 곳에서 확인하세요!",
  keywords: [
    "스튜디오 예약",
    "사진 스튜디오",
    "스튜디오 추천",
    "스튜디오 검색",
    "촬영 장소",
    "스튜디오 촬영",
    "사진 촬영",
    "터치즈",
  ],
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
  robots: "index, follow",
  alternates: {
    canonical: "https://toucheese-macwin.store",
  },
  openGraph: {
    type: "website",
    url: "https://toucheese-macwin.store",
    title: "터치즈 | 원하는 스튜디오를 한 눈에!",
    description:
      "스튜디오 고민은 이제 그만! 터치즈에서 원하는 스튜디오를 쉽게 찾아보고 예약하세요.",
    siteName: "터치즈",
    images: [
      {
        url: "https://toucheese-macwin.store/images/og-image.jpg",
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
      "스튜디오 고민은 이제 그만! 터치즈에서 원하는 스튜디오를 쉽게 찾아보고 예약하세요.",
    images: ["https://toucheese-macwin.store/images/og-image.jpg"],
  },
  metadataBase: new URL("https://toucheese-macwin.store"),
  // otherMetadata: {
  //   "google-site-verification": "YOUR_GOOGLE_SITE_VERIFICATION_CODE",
  // },
};
