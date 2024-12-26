import { getCookie } from "@/utils/cookieUtils";
import { useState } from "react";

export const useFetchQuestion = () => {
  const [questionDetail, setQuestionDetail] = useState<{
    id: number;
    title: string;
    content: string;
    answerResponse: {
      id: number;
      content: string;
      createDate: string;
    } | null;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuestion = async (questionId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/questions/${questionId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getCookie("accessToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch question detail");
      }
      const data = await response.json();
      setQuestionDetail(data);
    } catch (err) {
      console.error(err);
    }
  };

  return { questionDetail, fetchQuestion, loading, error };
};
