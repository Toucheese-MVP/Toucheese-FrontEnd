import useRequest from "@/features/common/hooks/useRequest";

type UpdateQuestionData = {
  title: string;
  content: string;
};

export function useManageQuestions() {
  const { request, loading, error } = useRequest();

  const updateQuestion = async (
    questionId: number,
    data: UpdateQuestionData
  ) => {
    try {
      await request("PUT", `/v1/questions/${questionId}`, data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteQuestion = async (questionId: number) => {
    try {
      await request("DELETE", `/v1/questions/${questionId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return { updateQuestion, deleteQuestion, loading, error };
}
