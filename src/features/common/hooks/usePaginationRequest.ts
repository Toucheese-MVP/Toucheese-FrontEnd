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
  defaultPageSize?: number,
  filters?: Record<string, unknown>
) {
  const { data, loading, error, request } = useRequest<T>();
  const [pageSize, setPageSize] = useState<number | undefined>(defaultPageSize);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [currentFilters, setCurrentFilters] = useState<Record<string, unknown>>(
    filters || {}
  );

  const refetch = useCallback(
    async (
      page: number = currentPage,
      size: number | undefined = pageSize,
      extraParams: Record<string, unknown> = {}
    ): Promise<T> => {
      const serializedParams = serializeParams({
        ...currentFilters, // 현재 필터
        ...extraParams, // 추가 파라미터 병합
      });

      const params = new URLSearchParams({
        page: page.toString(),
        ...(size !== undefined && { size: size.toString() }), // size가 있는 경우에만 추가
        ...serializedParams,
      });

      const response = await request("GET", endpoint, undefined, params);
      return response;
    },
    [endpoint, currentPage, pageSize, currentFilters, request]
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    refetch(page);
  };

  const updatePageSize = (size?: number) => {
    setPageSize(size);
    refetch(currentPage, size);
  };

  const updateFilters = (newFilters: Record<string, unknown>) => {
    setCurrentFilters(newFilters);
    setCurrentPage(0); // 필터 변경 시 페이지를 초기화
    refetch(0, pageSize, newFilters);
  };

  return {
    data,
    loading,
    error,
    refetch,
    setPage: updatePage,
    setPageSize: updatePageSize,
    setFilters: updateFilters,
  };
}
