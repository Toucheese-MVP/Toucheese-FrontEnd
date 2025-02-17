import type { Metadata } from "next";

export const defaultMetadata: Metadata = {
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
