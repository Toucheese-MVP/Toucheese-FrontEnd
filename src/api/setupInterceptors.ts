import apiClient from "./apiCient";
import { getCookie, setCookie } from "@/utils/cookieUtils/cookieUtils";

export function setupInterceptors() {
  apiClient.interceptors.request.use((config) => {
    const accessToken = getCookie("accessToken");
    const deviceId = getCookie("deviceId");

    if (!accessToken) {
      window.location.href = "/members/login";
      return Promise.reject(new Error("AccessToken이 없습니다."));
    }

    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
      if (deviceId) {
        config.headers["Device-Id"] = deviceId;
      }
    }

    return config;
  });

  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const { response } = error;

      if (response?.status === 401 && !response.config._retry) {
        response.config._retry = true;

        const refreshToken = getCookie("refreshToken");
        const deviceId = getCookie("deviceId");

        if (!refreshToken || !deviceId) {
          window.location.href = "/members/login";
          return Promise.reject(error);
        }

        try {
          const res = await apiClient.post("/v1/tokens/reissue", {
            refreshToken,
            deviceId,
          });

          const newAccessToken =
            res.headers["authorization"]?.split(" ")[1] ?? "";

          setCookie("accessToken", newAccessToken, {
            path: "/",
            maxAge: 604800,
            secure: process.env.NODE_ENV === "production",
          });

          response.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return apiClient(response.config);
        } catch (reissueError) {
          window.location.href = "/members/login";
          return Promise.reject(reissueError);
        }
      }

      if (response?.status === 403) {
        alert("접근 권한이 없습니다.");
        window.location.href = "/members/login";
      }

      if (response?.status >= 500) {
        alert("서버 오류가 발생했습니다.");
      }

      return Promise.reject(error);
    }
  );
}
