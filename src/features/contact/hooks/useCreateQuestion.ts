import useRequest from "@/features/common/hooks/useRequest";
import { useState } from "react";

type CreateQuestionData = {
  title: string;
  content: string;
  files: File[]; // 파일을 포함
};

type CreateQuestionResponse = {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
};

export function useCreateQuestion() {
  const { request, loading, error } = useRequest<CreateQuestionResponse>();
  const [success, setSuccess] = useState<boolean>(false);

  const createQuestion = async (data: CreateQuestionData) => {
    setSuccess(false);
    try {
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("content", data.content);
      data.files.map((file) => formData.append("uploadFiles", file));

      const response = await request(
        "POST",
        "/v1/questions",
        formData,
        undefined,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(formData);
      setSuccess(true);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("질문 생성 중 오류 발생");
    }
  };

  return { createQuestion, loading, error, success };
}
