import { useEffect, useCallback, useState } from "react";
import useRequest from "@/features/common/hooks/useRequest";

function serializeParams(
  params: Record<string, unknown>
): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        return [key, value.toString()];
      }
      throw new Error(`Invalid parameter type for key ${key}: ${typeof value}`);
    })
  );
}

export function usePaginatedRequest<T>(
  endpoint: string,
  initialPage: number = 0,
  defaultPageSize: number = 10,
  additionalParams?: Record<string, unknown>
) {
  const { data, loading, error, request } = useRequest<T>();
  const [pageSize, setPageSize] = useState<number>(defaultPageSize);

  const refetch = useCallback(
    async (page: number, size: number = pageSize): Promise<T> => {
      const serializedParams = serializeParams(additionalParams || {});
      const params = new URLSearchParams({
        page: page.toString(),
        size: size.toString(),
        ...serializedParams,
      });

      const response = await request("GET", endpoint, undefined, params);
      return response;
    },
    [endpoint, pageSize, additionalParams, request]
  );

  useEffect(() => {
    if (data === undefined) {
      refetch(initialPage, pageSize);
    }
  }, [refetch, initialPage, pageSize]);

  return { data, loading, error, refetch, setPageSize };
}
