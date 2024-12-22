import { useEffect, useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export function useAdminQuestions(
  initialPage: number = 0,
  initialPageSize: number = 10
) {
  const { data, loading, error, request } = useRequest<{
    totalPages: number;
    totalElements: number;
    size: number;
    content: {
      id: number;
      title: string;
      content: string;
      createDate: string;
      answerStatus: string;
    }[];
  }>();

  const refetch = useCallback(
    async (page: number, pageSize: number = initialPageSize) => {
      const params = new URLSearchParams({
        page: page.toString(),
        size: pageSize.toString(),
      });

      try {
        const response = await request(
          "GET",
          "/v1/admin/questions",
          undefined,
          params
        );
        return response;
      } catch (err) {
        console.error("데이터 요청 중 오류:", err);
        throw err;
      }
    },
    [request, initialPageSize]
  );

  useEffect(() => {
    refetch(initialPage, initialPageSize);
  }, [initialPage, initialPageSize, refetch]);

  return {
    data, // 조회된 문의 글 데이터
    loading, // 로딩 상태
    error, // 에러 상태
    refetch, // 데이터를 다시 불러오는 함수
  };
}
