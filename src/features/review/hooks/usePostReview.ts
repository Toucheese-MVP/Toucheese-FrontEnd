import useRequest from "@/features/common/hooks/useRequest";
import { useState } from "react";

type CreateReviewData = {
  content: string;
  rating: number;
  uploadFiles: File[];
};

export function usePostReview(studioId: number, productId: number) {
  const { request, loading, error } = useRequest();
  const [success, setSuccess] = useState<boolean>(false);

  const createReview = async (data: CreateReviewData) => {
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("content", data.content);
      formData.append("rating", String(data.rating));

      data.uploadFiles.forEach((file) => formData.append("uploadFiles", file));

      const response = await request(
        "POST",
        `/v1/studios/${studioId}/products/${productId}/reviews`,
        formData,
        undefined,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccess(true);
      return response;
    } catch (err) {
      console.error(err);
      throw new Error("리뷰 작성 중 오류 발생");
    }
  };

  return { createReview, loading, error, success };
}
