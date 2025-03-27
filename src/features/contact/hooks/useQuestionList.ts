import { useState, useCallback, useEffect } from "react";
import useRequest from "@/features/common/hooks/useRequest";
import { getCookie } from "@/utils/cookieUtils/cookieUtils";
import type { Question } from "../types";

type QuestionResponse = {
  content: Question[];
  totalPages: number;
  totalElements: number;
};

export function useQuestionsList(
  initialPage: number = 1,
  pageSize: number = 10
) {
  const { loading, error, request } = useRequest<QuestionResponse>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const fetchQuestions = useCallback(
    async (page: number) => {
      const token = getCookie("accessToken");
      if (!token) {
        throw new Error("Token not found");
      }

      try {
        const response = await request(
          "GET",
          "/v1/questions",
          undefined,
          new URLSearchParams({
            page: (page - 1).toString(),
            size: pageSize.toString(),
          }),
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setQuestions(response.content);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error(err);
      }
    },
    [request, pageSize]
  );

  useEffect(() => {
    if (!Number.isNaN(currentPage)) {
      fetchQuestions(currentPage);
    }
  }, [currentPage, fetchQuestions]);

  return {
    questions,
    totalPages,
    currentPage,
    loading,
    error,
    setPage: setCurrentPage,
    refetch: fetchQuestions,
  };
}
