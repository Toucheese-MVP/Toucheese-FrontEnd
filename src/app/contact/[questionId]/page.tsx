"use client";

import { TopBar } from "@/features/common/components/topbar";
import ContactItem from "@/features/contact/components/ContactItem";
import { useFetchQuestion } from "@/features/contact/hooks/useFetchAnswer";
import { use, useEffect } from "react";

function QuestionDetailPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const resolvedParams = use(params);
  const questionId = parseInt(resolvedParams.questionId, 10);

  const { questionDetail, fetchQuestion } = useFetchQuestion();

  useEffect(() => {
    if (!isNaN(questionId)) {
      fetchQuestion(questionId);
    }
  }, []);

  if (!questionDetail) {
    return <div>문의 내용을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <TopBar message="문의 상세보기" showCart={false} showShare={false} />
      <ContactItem
        contact={{
          id: questionDetail.id,
          title: questionDetail.title,
          status: questionDetail.answerStatus,
          author: "작성자",
          date: questionDetail.createDate,
          photos: [],
        }}
      />
      <div className="border rounded-lg p-4 bg-primary-1">
        {questionDetail.answerResponse ? (
          <>
            <h2 className="text-md font-bold mb-2">답변</h2>
            <p>{questionDetail.answerResponse.content}</p>
            <p className="text-sm text-gray-500 mt-2">
              작성일:{" "}
              {new Date(
                questionDetail.answerResponse.createDate
              ).toLocaleDateString()}
            </p>
          </>
        ) : (
          <p className="text-sm text-gray-500 italic">답변이 아직 없습니다.</p>
        )}
      </div>
    </div>
  );
}

export default QuestionDetailPage;
