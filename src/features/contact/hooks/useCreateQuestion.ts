import useRequest from "@/features/common/hooks/useRequest";
import { useState } from "react";

type CreateQuestionData = {
  title: string;
  content: string;
};

const convertFileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string); // Base64 문자열 반환
    };
    reader.onerror = reject;
    reader.readAsDataURL(file); // 파일을 Base64로 읽기
  });

export function useCreateQuestion() {
  const { request, loading, error } = useRequest();
  const [success, setSuccess] = useState<boolean>(false);

  const createQuestion = async (data: CreateQuestionData) => {
    setSuccess(false);
    try {
      const questionResponse = await request("POST", "/v1/questions", data);

      setSuccess(true);
      return questionResponse;
    } catch (err) {
      console.error(err);
      throw new Error("질문 생성 중 오류 발생");
    }
  };

  const uploadImages = async (questionId: number, files: File[]) => {
    const uploadFiles = await Promise.all(
      files.map((file) => convertFileToBase64(file))
    );

    try {
      const uploadResponse = await request(
        "POST",
        `/v2/questions/${questionId}/images`,
        {
          uploadFiles,
        }
      );
      return uploadResponse;
    } catch (err) {
      console.error(err);
      throw new Error("이미지 업로드 실패");
    }
  };

  return { createQuestion, uploadImages, loading, error, success };
}
