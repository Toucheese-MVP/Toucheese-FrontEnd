import { useEffect, useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export function usePaginatedRequest<T>(
  endpoint: string,
  initialPage: number = 0,
  initialPageSize: number = 10,
  additionalParams?: Record<string, string | number>
) {
  const { data, loading, error, request } = useRequest<T>();

  const refetch = useCallback(
    async (page: number, pageSize: number = initialPageSize): Promise<T> => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(additionalParams || {}).map(([key, value]) => [
            key,
            value.toString(),
          ])
        ),
      });

      const response = await request("GET", endpoint, undefined, params);
      return response;
    },
    [endpoint, initialPageSize, additionalParams, request]
  );

  useEffect(() => {
    refetch(initialPage, initialPageSize);
  }, [initialPage, initialPageSize, refetch]);

  return { data, loading, error, refetch };
}
