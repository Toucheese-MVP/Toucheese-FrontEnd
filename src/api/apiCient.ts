import { getCookie } from "@/utils/getcookie";
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
  const accessToken = localStorage.getItem("accessToken");
  const deviceId = localStorage.getItem("deviceId");

  if (!accessToken) {
    console.warn("AccessToken이 없습니다. 로그인 페이지로 이동합니다.");
    window.location.href = "/members/login";
    return Promise.reject(new Error("AccessToken이 없습니다."));
  }

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    console.log(
      "헤더에 설정된 Authorization:",
      config.headers["Authorization"]
    );
  }

  if (deviceId && config.headers) {
    config.headers["Device-Id"] = deviceId;
    console.log("헤더에 설정된 Device-Id:", config.headers["Device-Id"]);
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
        console.warn("인증 만료: 토큰 재발급 시도");

        const refreshToken = getCookie("refreshToken");
        const deviceId = getCookie("deviceId");

        if (!refreshToken || !deviceId) {
          console.error(
            "RefreshToken 또는 DeviceId가 없습니다. 로그인 페이지로 이동합니다."
          );
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
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "content-type": "application/json",
              },
            }
          );

          const NewAuthorization = response.headers["authorization"];
          const newAccessToken = NewAuthorization.split(" ")[1];

          localStorage.setItem("accessToken", newAccessToken);

          config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return apiClient(config);
        } catch (reissueError) {
          console.error("토큰 재발급 실패:", reissueError);
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
      alert("네트워크 연결 상태를 확인해주세요.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
