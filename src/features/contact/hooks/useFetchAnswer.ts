import useRequest from "@/features/common/hooks/useRequest";

export const useFetchQuestion = () => {
  const {
    data: questionDetail,
    loading,
    error,
    request,
  } = useRequest<{
    id: number;
    title: string;
    content: string;
    answerResponse: {
      id: number;
      content: string;
      createDate: string;
    } | null;
  }>();

  const fetchQuestion = async (questionId: number) => {
    if (!questionId) throw new Error("questionId가 제공되지 않았습니다.");
    await request("GET", `/v1/questions/${questionId}`);
  };

  return { questionDetail, loading, error, fetchQuestion };
};
