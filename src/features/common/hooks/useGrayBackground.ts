import { grayBackgroundPaths } from "@/constants/grayBackgroundPaths";

export const useGrayBackground = (pathname: string) => {
  return grayBackgroundPaths.includes(pathname);
};
