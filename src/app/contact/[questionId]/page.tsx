"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useFetchQuestion } from "@/features/contact/hooks/useFetchAnswer";

function QuestionDetailPage() {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("questionId");
  const { questionDetail, loading, error, fetchQuestion } = useFetchQuestion();

  useEffect(() => {
    if (questionId) {
      fetchQuestion(Number(questionId)).catch((err) => {
        console.error("데이터 요청 실패:", err);
      });
    }
  }, [questionId, fetchQuestion]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!questionDetail) {
    return <div>문의 내용을 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">{questionDetail.title}</h1>
      <p className="text-gray-700 mb-4">{questionDetail.content}</p>
      <div className="border rounded-lg p-4 bg-gray-50">
        {questionDetail.answerResponse ? (
          <>
            <h2 className="text-md font-bold mb-2">답변</h2>
            <p>{questionDetail.answerResponse.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              작성일: {questionDetail.answerResponse.createDate}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500">답변이 아직 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default QuestionDetailPage;
