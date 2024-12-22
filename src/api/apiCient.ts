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

  // 로컬 스토리지에서 가져온 accessToken과 deviceId 확인
  console.log("로컬 스토리지에서 가져온 accessToken:", accessToken);
  console.log("로컬 스토리지에서 가져온 deviceId:", deviceId);

  if (accessToken && config.headers) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
    // 헤더에 설정된 Authorization 값 확인
    console.log(
      "헤더에 설정된 Authorization:",
      config.headers["Authorization"]
    );
  }

  if (deviceId && config.headers) {
    config.headers["Device-Id"] = deviceId;
    // 헤더에 설정된 Device-Id 값 확인
    console.log("헤더에 설정된 Device-Id:", config.headers["Device-Id"]);
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      const { status } = response;

      if (status >= 500) {
        alert("서버에서 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      } else if (status === 401 || status === 403) {
        alert("인증이 만료되었습니다. 다시 로그인해주세요.");
        // 필요 시 로그아웃 로직 추가
      }
    } else {
      alert("네트워크 연결 상태를 확인해주세요.");
    }

    return Promise.reject(error);
  }
);

export default apiClient;
