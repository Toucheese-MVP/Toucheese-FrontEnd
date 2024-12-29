import { useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

interface AnswerResponse {
  id: number;
  title: string;
  content: string;
  createDate: string;
}

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  createDate: string;
  answerResponse?: AnswerResponse;
}

export function useAdminAnswer() {
  const { request, loading, error } = useRequest();

  const createAnswer = useCallback(
    async (questionId: number, title: string, answerContent: string) => {
      try {
        const response = await request(
          "POST",
          `/v1/admin/questions/${questionId}/answers`,
          JSON.stringify({
            title: title.trim(),
            content: answerContent.trim(),
          })
        );
        console.log("POST 요청 성공:", response);
        return response;
      } catch (err) {
        console.error("POST 요청 실패:", err);
        throw err;
      }
    },
    [request]
  );

  const updateAnswer = useCallback(
    async (questionId: number, title: string, answerContent: string) => {
      try {
        const response = await request(
          "PUT",
          `/v1/admin/questions/${questionId}/answers`,
          JSON.stringify({
            title: title.trim(),
            content: answerContent.trim(),
          })
        );
        console.log("PUT 요청 성공:", response);
        return response;
      } catch (err) {
        console.error("PUT 요청 실패:", err);
        throw err;
      }
    },
    [request]
  );

  const deleteAnswer = useCallback(
    async (answerId: number) => {
      try {
        const response = await request(
          "DELETE",
          `/v1/admin/questions/answers/${answerId}`,
          null
        );
        console.log("답변 삭제 성공:", response);
        return response;
      } catch (err) {
        console.error("답변 삭제 실패:", err);
        throw err;
      }
    },
    [request]
  );

  const isQuestionDetail = (data: unknown): data is QuestionDetail => {
    return (
      typeof data === "object" &&
      data !== null &&
      "id" in data &&
      "title" in data &&
      "content" in data &&
      "createDate" in data &&
      ("answerResponse" in data
        ? typeof (data as QuestionDetail).answerResponse === "object"
        : true)
    );
  };

  const getAnswerDetail = useCallback(
    async (questionId: number): Promise<QuestionDetail> => {
      try {
        const response = await request(
          "GET",
          `/v1/admin/questions/${questionId}`,
          null
        );
        if (!isQuestionDetail(response)) {
          throw new Error("Invalid response format");
        }
        console.log("질문 세부 정보 가져오기 성공:", response);
        return response;
      } catch (err) {
        console.error("질문 세부 정보 가져오기 실패:", err);
        throw err;
      }
    },
    [request]
  );

  return {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswerDetail,
    loading,
    error,
  };
}
