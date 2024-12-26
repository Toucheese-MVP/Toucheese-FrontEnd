import { useState, useCallback, useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";

type QuestionResponse = {
  content: {
    id: number;
    title: string;
    content: string;
    createDate: string;
    answerStatus: string;
  }[];
  totalPages: number;
  totalElements: number;
};

export function useAdminQuestions(
  initialPage: number = 1,
  pageSize: number = 10
) {
  const { loading, error, request } = useRequest<QuestionResponse>();
  const [data, setData] = useState<QuestionResponse | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(0);

  const fetchQuestions = useCallback(
    async (page: number) => {
      const params = new URLSearchParams({
        page: (page - 1).toString(),
        size: pageSize.toString(),
      });

      try {
        const response = await request(
          "GET",
          "/v1/admin/questions",
          undefined,
          params
        );
        setData(response);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error("데이터 요청 중 오류:", err);
      }
    },
    [request, pageSize]
  );

  useEffect(() => {
    fetchQuestions(currentPage);
  }, [currentPage, fetchQuestions]);

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    setPage: setCurrentPage,
    refetch: fetchQuestions,
  };
}
