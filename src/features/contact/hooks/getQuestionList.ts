// features/contact/hooks/getQuestionsList.ts
import { apiRequest } from "@/api/apiRequest";
import type { Question } from "@/features/contact/types";

interface QuestionResponse {
  content: Question[];
  totalPages: number;
  totalElements: number;
}

export async function getQuestionsList(
  page: number,
  size: number = 10
): Promise<QuestionResponse> {
  const params = new URLSearchParams({
    page: (page - 1).toString(),
    size: size.toString(),
  });

  return await apiRequest<QuestionResponse>(
    "GET",
    "/v1/questions",
    undefined,
    params
  );
}
