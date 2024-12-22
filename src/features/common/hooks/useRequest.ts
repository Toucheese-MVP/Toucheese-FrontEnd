import { useState, useCallback } from "react";
import { apiRequest } from "@/api/apiRequest";
import { ResponseType } from "axios";

interface ApiRequestOptions {
  headers?: Record<string, string>;
  responseType?: ResponseType;
}

function useRequest<T = unknown, D = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" | "PUT" | "DELETE",
      endpoint: string,
      body?: D,
      params?: URLSearchParams,
      options?: ApiRequestOptions
    ) => {
      setLoading(true);
      setError(null);

      try {
        const queryString = params?.toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        const response = await apiRequest<T, D>(
          method,
          url,
          body,
          undefined,
          options
        );
        setData(response);
        return response;
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("알 수 없는 에러가 발생했습니다.");
        }
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleRequest = useCallback(
    async (method: "PUT" | "DELETE", endpoint: string, data?: D) => {
      const token = localStorage.getItem("accessToken");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      return request(method, endpoint, data, undefined, { headers });
    },
    [request]
  );

  return { data, loading, error, request, handleRequest };
}

export default useRequest;
