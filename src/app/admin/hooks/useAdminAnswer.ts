import { useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  createDate: string;
  answerResponse: {
    id: number;
    title: string;
    content: string;
    createDate: string;
  };
}

export function useAdminAnswer() {
  const { request, loading, error } = useRequest();

  const createAnswer = useCallback(
    async (questionId: number, title: string, answerContent: string) => {
      const body = JSON.stringify({
        title: title.trim(),
        content: answerContent.trim(),
      });
      try {
        const response = await request(
          "POST",
          `/v1/admin/questions/${questionId}/answers`,
          body
        );
        console.log("답변 작성 성공:", response);
        return response;
      } catch (err) {
        console.error("답변 작성 실패:", err);
        throw err;
      }
    },
    [request]
  );

  const updateAnswer = useCallback(
    async (questionId: number, title: string, content: string) => {
      try {
        const response = await request(
          "PUT",
          `/v1/admin/questions/${questionId}/answers`,
          {
            title: title.trim(),
            content: content.trim(),
          }
        );
        console.log("답변 수정 성공:", response);
        return response;
      } catch (err) {
        console.error("답변 수정 실패:", err);
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
          `/v1/admin/questions/answers/${answerId}`
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
      "createDate" in data
    );
  };
  const getAnswerDetail = async (
    questionId: number
  ): Promise<QuestionDetail> => {
    const response = await request("GET", `/v1/admin/questions/${questionId}`);
    if (!isQuestionDetail(response)) {
      throw new Error("Invalid response format");
    }
    return response;
  };

  return {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    getAnswerDetail,
    loading,
    error,
  };
}
