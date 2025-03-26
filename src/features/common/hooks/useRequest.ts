"use client";

import { useState, useCallback } from "react";
import apiClient from "@/api/apiCient";
import { getCookie } from "@/utils/cookieUtils/cookieUtils";

interface RequestOptions {
  headers?: Record<string, string>;
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function useRequest<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      method: HttpMethod,
      endpoint: string,
      body?: unknown,
      params?: URLSearchParams,
      options?: RequestOptions
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const url = params ? `${endpoint}?${params.toString()}` : endpoint;
        const accessToken = getCookie("accessToken");
        const deviceId = getCookie("deviceId");

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
          ...(deviceId && { "Device-Id": deviceId }),
          ...(options?.headers || {}),
        };

        const response = await apiClient.request<T>({
          method,
          url,
          data: body,
          headers,
        });

        setData(response.data);
        return response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err.message || "요청 중 오류 발생";
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, loading, error, request };
}

export default useRequest;
