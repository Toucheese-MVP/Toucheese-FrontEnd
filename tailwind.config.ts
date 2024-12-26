import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
      colors: {
        gray: {
          10: "#141414",
          9: "#1F1F1F",
          8: "#262626",
          7: "#434343",
          6: "#595959",
          5: "#8C8C8C",
          4: "#BFBFBF",
          3: "#D9D9D9",
          2: "#F0F0F0",
          1: "#FAFAFA",
        },
        primary: {
          10: "#664100",
          9: "#8C5900",
          8: "#B27100",
          7: "#E59100",
          6: "#FFC000",
          5: "#FFD129",
          4: "#FFDF52",
          3: "#FFEB7A",
          2: "#FFF4A3",
          1: "#FFFDE6",
        },
        kakao: "#fee500",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "16/9": "16 / 9",
        "1/1": "1/1",
      },
      boxShadow: {
        inner: "inset 0 0 0 5px #FFC000",
      },
      maxWidth: {
        custom: "var(--max-width)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;
