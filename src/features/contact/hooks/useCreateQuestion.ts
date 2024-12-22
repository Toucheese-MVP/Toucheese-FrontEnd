import useRequest from "@/features/common/hooks/useRequest";
import { useState } from "react";

type CreateQuestionData = {
  title: string;
  content: string;
};

export function useCreateQuestion() {
  const { request, loading, error } = useRequest();
  const [success, setSuccess] = useState<boolean>(false);

  const createQuestion = async (data: CreateQuestionData) => {
    setSuccess(false);
    try {
      await request("POST", "/v1/questions", data);
      setSuccess(true); // 요청 성공 시 상태 업데이트
    } catch (err) {
      console.error(err); // 요청 실패 시 에러 처리
    }
  };

  return { createQuestion, loading, error, success };
}
