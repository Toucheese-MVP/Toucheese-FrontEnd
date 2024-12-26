import { getCookie, setCookie } from "@/utils/cookieUtils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

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

    if (response) {
      const { status, config } = response;

      if (status === 401 && !config._retry) {
        config._retry = true;
        const refreshToken = getCookie("refreshToken");
        const deviceId = getCookie("deviceId");

        if (!refreshToken || !deviceId) {
          window.location.href = "/members/login";
          return Promise.reject(error);
        }

        try {
          const tokenResponse = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/tokens/reissue`,
            {
              deviceId,
              refreshToken,
            },
            {
              headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`,
              },
            }
          );

          const authorization = tokenResponse.headers["authorization"];
          const newAccessToken = authorization?.split(" ")[1];

          if (!newAccessToken) {
            throw new Error("새로운 AccessToken을 받지 못했습니다.");
          }

          setCookie("accessToken", newAccessToken, {
            path: "/",
            maxAge: 604800, // 7일
            secure: process.env.NODE_ENV === "production",
          });

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(config);
        } catch (reissueError) {
          window.location.href = "/members/login";
          return Promise.reject(reissueError);
        }
      }

      if (status >= 500) {
        alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else if (status === 403) {
        alert("접근 권한이 없습니다. 다시 로그인해주세요.");
        window.location.href = "/members/login";
      }
    } else {
      alert("네트워크 오류가 발생했습니다. 다시 로그인하세요.");
      window.location.href = "/members/login";
    }

    return Promise.reject(error);
  }
);

export default apiClient;
