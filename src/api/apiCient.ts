import { getCookie, setCookie } from "@/utils/cookieUtils";
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getCookie("accessToken");
  const deviceId = getCookie("deviceId");

  if (window.location.pathname === "/members/login") {
    return config;
  }

  if (!accessToken) {
    window.location.href = "/members/login";
    return Promise.reject(new Error("AccessToken이 없습니다."));
  }

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  if (deviceId && config.headers) {
    config.headers["Device-Id"] = deviceId;
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
        const refreshToken = getCookie("refreshToken");
        const deviceId = getCookie("deviceId");

        if (!refreshToken || !deviceId) {
          window.location.href = "/members/login";
          return Promise.reject(error);
        }

        try {
          config._retry = true;

          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/v1/tokens/reissue`,
            {
              refreshToken,
              deviceId,
            },
            {
              headers: {
                Authorization: `Bearer ${getCookie("accessToken")}`,
                "content-type": "application/json",
              },
            }
          );

          const newAuthorization = response.headers["authorization"];
          const newAccessToken = newAuthorization?.split(" ")[1];

          if (!newAccessToken) {
            throw new Error("새로운 AccessToken을 받지 못했습니다.");
          }

          setCookie("accessToken", newAccessToken, { maxAge: 604800 });

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
    }

    return Promise.reject(error);
  }
);

export default apiClient;
