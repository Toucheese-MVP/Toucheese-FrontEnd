"use client";

import { useState, useCallback } from "react";
import { useAdminQuestions } from "../../hooks/AdminQuestion";
import { useAdminAnswer } from "../../hooks/useAdminAnswer";
import CommonPagination from "@/features/common/components/pagination";
import QuestionDetailModal from "../components/QuestionDetailModal";

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  createDate: string;
  answerResponse?: {
    id: number;
    title: string;
    content: string;
    createDate: string;
  };
}

function AdminContactList() {
  const {
    data = { content: [], totalPages: 0, totalElements: 0 },
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    setPage,
  } = useAdminQuestions(1, 10);

  const { createAnswer, updateAnswer, deleteAnswer, getAnswerDetail } =
    useAdminAnswer();

  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);
  const [answerTitle, setAnswerTitle] = useState("");
  const [answerContent, setAnswerContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const resetForm = useCallback(() => {
    setAnswerTitle("");
    setAnswerContent("");
    setIsEditing(false);
  }, []);

  const handleCreateAnswer = async () => {
    if (!answerTitle.trim() || !answerContent.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      if (!selectedQuestion) {
        alert("선택된 질문이 없습니다.");
        return;
      }

      await createAnswer(selectedQuestion.id, answerTitle, answerContent);
      alert("답변이 성공적으로 작성되었습니다.");
      resetForm();
      await refetch(currentPage);
      await handleViewDetail(selectedQuestion.id);
    } catch (err) {
      console.error("답변 작성 중 오류:", err);
      alert("답변 작성 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateAnswer = async () => {
    if (!answerTitle.trim() || !answerContent.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      if (!selectedQuestion) {
        alert("선택된 질문이 없습니다.");
        return;
      }

      await updateAnswer(selectedQuestion.id, answerTitle, answerContent);
      alert("답변이 성공적으로 수정되었습니다.");
      resetForm();
      await refetch(currentPage);
      await handleViewDetail(selectedQuestion.id);
    } catch (err) {
      console.error("답변 수정 중 오류:", err);
      alert("답변 수정 중 오류가 발생했습니다.");
    }
  };

  const handleViewDetail = async (questionId: number) => {
    try {
      const detail: QuestionDetail = await getAnswerDetail(questionId);
      setSelectedQuestion(detail);
      setAnswerTitle(detail.answerResponse?.title || "");
      setAnswerContent(detail.answerResponse?.content || "");
    } catch (err) {
      console.error("문의글 조회 중 오류:", err);
      alert("문의글 조회 중 오류가 발생했습니다.");
    }
  };

  const handleDeleteAnswer = async (answerId: number) => {
    if (!confirm("정말로 답변을 삭제하시겠습니까?")) return;

    try {
      await deleteAnswer(answerId);
      alert("답변이 성공적으로 삭제되었습니다.");
      await refetch(currentPage);
      if (selectedQuestion) {
        await handleViewDetail(selectedQuestion.id);
      }
    } catch (err) {
      console.error("답변 삭제 실패:", err);
      alert("답변 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
      {/* Table */}
      <table className="hidden md:table min-w-full text-sm text-gray-800 border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 text-center">ID</th>
            <th className="px-2 py-2 text-center">제목</th>
            <th className="px-2 py-2 text-center">내용</th>
            <th className="px-2 py-2 text-center">작성일</th>
            <th className="px-2 py-2 text-center">상태</th>
          </tr>
        </thead>
        <tbody>
          {data?.content.map((question) => (
            <tr
              key={question.id}
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => handleViewDetail(question.id)}
            >
              <td className="py-2 px-2 text-center">{question.id}</td>
              <td className="py-2 px-2 text-center truncate max-w-xs">
                {question.title}
              </td>
              <td className="py-2 px-2 text-center truncate max-w-xs">
                {question.content}
              </td>
              <td className="py-2 px-2 text-center">{question.createDate}</td>
              <td className="py-2 px-2 text-center">{question.answerStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {selectedQuestion && (
        <QuestionDetailModal
          selectedQuestion={selectedQuestion}
          isEditing={isEditing}
          answerTitle={answerTitle}
          answerContent={answerContent}
          onTitleChange={setAnswerTitle}
          onContentChange={setAnswerContent}
          onSubmit={isEditing ? handleUpdateAnswer : handleCreateAnswer}
          onCancel={resetForm}
          onDelete={handleDeleteAnswer}
          onEdit={() => setIsEditing(true)}
          onClose={() => setSelectedQuestion(null)}
        />
      )}
    </div>
  );
}

export default AdminContactList;
