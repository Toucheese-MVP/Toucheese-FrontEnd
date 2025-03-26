// api/apiRequest.ts
import apiClient from "./apiCient";
import { cookies } from "next/headers";

export async function apiRequest<T, D = unknown>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  data?: D,
  params?: URLSearchParams,
  headers: Record<string, string> = {}
): Promise<T> {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  const url = params ? `${endpoint}?${params.toString()}` : endpoint;
  const response = await apiClient.request<T>({
    method,
    url,
    data,
    headers: {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...headers,
    },
  });

  return response.data;
}
