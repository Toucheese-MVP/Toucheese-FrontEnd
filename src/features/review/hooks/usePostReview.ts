import useRequest from "@/features/common/hooks/useRequest";
import { useState } from "react";

type CreateReviewData = {
  content: string;
  rating: number;
  uploadFiles: [string];
};

export function usePostReview() {
  const { request, loading, error } = useRequest<CreateReviewData>();
  const [success, setSuccess] = useState<boolean>(false);

  const createQuestion = async (data: CreateReviewData) => {
    setSuccess(false);
    try {
      const formData = new FormData();

      formData.append("content", data.content);
      data.uploadFiles.map((file) => formData.append("uploadFiles", file));

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
