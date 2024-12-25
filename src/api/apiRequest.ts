import axios, { AxiosResponse, ResponseType } from "axios";
import apiClient from "./apiCient";
import { getCookie } from "@/utils/cookieUtils";

export async function apiRequest<T, D = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: D,
  params?: URLSearchParams,
  options?: { headers?: Record<string, string>; responseType?: ResponseType }
): Promise<T> {
  try {
    const url = params ? `${endpoint}?${params.toString()}` : endpoint;

    const token = getCookie("accessToken");

    const defaultHeaders: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    const response: AxiosResponse<T> = await apiClient.request({
      method,
      url,
      data,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
      responseType: options?.responseType || "json",
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    if (error instanceof Error && error.message) {
      throw new Error(error.message);
    }
    throw new Error("요청 처리 중 알 수 없는 오류가 발생했습니다.");
  }
}
