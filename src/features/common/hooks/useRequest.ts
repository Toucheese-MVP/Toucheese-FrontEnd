import { useState, useCallback } from "react";
import { apiRequest } from "@/api/apiRequest";

interface RequestOptions {
  headers?: Record<string, string>;
}

function useRequest<T = unknown>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async (
      method: "GET" | "POST" | "PUT" | "DELETE",
      endpoint: string,
      body?: unknown,
      params?: URLSearchParams,
      options?: RequestOptions
    ): Promise<T> => {
      setLoading(true);
      setError(null);

      try {
        const queryString = params?.toString();
        const url = queryString ? `${endpoint}?${queryString}` : endpoint;

        // Make the API request
        const response = await apiRequest<T, unknown>(
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

  return { data, loading, error, request };
}

export default useRequest;
