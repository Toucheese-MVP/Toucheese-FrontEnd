import { useCallback } from "react";
import useRequest from "@/features/common/hooks/useRequest";

export function useAdminAnswer() {
  const { request, loading, error } = useRequest();

  // 답변 작성
  const createAnswer = useCallback(
    async (questionId: number, answerContent: string) => {
      try {
        const response = await request(
          "POST",
          `/v1/admin/questions/${questionId}/answers`,
          { content: answerContent }
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

  // 답변 수정
  const updateAnswer = useCallback(
    async (questionId: number, answerContent: string) => {
      try {
        const response = await request(
          "PUT",
          `/v1/admin/questions/${questionId}/answers`,
          { content: answerContent }
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

  // 답변 삭제
  const deleteAnswer = useCallback(
    async (questionId: number) => {
      try {
        const response = await request(
          "DELETE",
          `/v1/admin/questions/${questionId}/answers`
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

  return {
    createAnswer,
    updateAnswer,
    deleteAnswer,
    loading,
    error,
  };
}
