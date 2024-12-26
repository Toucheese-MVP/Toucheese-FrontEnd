"use client";
import { useState } from "react";
import { useAdminQuestions } from "../../hooks/AdminQuestion";
import { useAdminAnswer } from "../../hooks/useAdminAnswer";

interface QuestionDetail {
  id: number;
  title: string;
  content: string;
  createDate: string;
  answerResponse: {
    id: number;
    title: string;
    content: string;
    createDate: string;
  };
}

function AdminContactList() {
  const { data, loading, error, refetch } = useAdminQuestions();
  const { createAnswer, updateAnswer, deleteAnswer, getAnswerDetail } =
    useAdminAnswer();
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);

  const handleCreateAnswer = async (questionId: number) => {
    const title = prompt("제목을 입력하세요")?.trim();
    const content = prompt("답변 내용을 입력해주세요:")?.trim();
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createAnswer(questionId, title, content);
      alert("답변이 성공적으로 작성되었습니다.");
      await refetch(0, 10); // 전체 데이터 새로고침
      await handleViewDetail(questionId); // 모달 데이터 새로고침
    } catch (err) {
      console.error("답변 작성 중 오류:", err);
      alert("답변 작성 중 오류가 발생했습니다.");
    }
  };

  const handleUpdateAnswer = async (questionId: number) => {
    const content = prompt("새로운 답변 내용을 입력해주세요:")?.trim();
    if (!content) {
      alert("답변 내용을 입력해주세요.");
      return;
    }

    try {
      await updateAnswer(questionId, content);
      alert("답변이 성공적으로 수정되었습니다.");
      await refetch(0, 10); // 전체 데이터 새로고침
      await handleViewDetail(questionId); // 모달 데이터 새로고침
    } catch (err) {
      console.error("답변 수정 중 오류:", err);
      alert("답변 수정 중 오류가 발생했습니다.");
    }
  };

  const handleViewDetail = async (questionId: number) => {
    try {
      const detail = await getAnswerDetail(questionId);
      setSelectedQuestion(detail);
    } catch (err) {
      console.error("문의글 조회 중 오류:", err);
      alert("문의글 조회 중 오류가 발생했습니다.");
    }
  };

  const handleCloseDetail = () => {
    setSelectedQuestion(null); // 상세 보기 닫기
  };

  const handleDeleteAnswer = async (answerId: number) => {
    if (!confirm("정말로 답변을 삭제하시겠습니까?")) return;

    try {
      await deleteAnswer(answerId);
      alert("답변이 성공적으로 삭제되었습니다.");
      await refetch(0, 10); // 전체 데이터 새로고침
      if (selectedQuestion) {
        await handleViewDetail(selectedQuestion.id); // 모달 데이터 새로고침
      }
    } catch (err) {
      console.error("답변 삭제 실패:", err);
      alert("답변 삭제 중 오류가 발생했습니다.");
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
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
              className="border-b"
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
      <div className="md:hidden block space-y-4 test:sm">
        {data?.content.map((question) => (
          <div
            key={question.id}
            className="border p-4 rounded-lg shadow-md text-gray-800 space-y-2"
          >
            <p>ID: {question.id}</p>
            <p>제목: {question.title}</p>
            <p>내용: {question.content}</p>
            <p>작성일: {question.createDate}</p>
            <p>상태: {question.answerStatus}</p>
          </div>
        ))}
      </div>
      {selectedQuestion && (
        <div className="p-6 mt-4 border rounded-lg bg-gray-50 shadow-lg fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-11/12 md:w-2/3 lg:w-1/2">
          <h3 className="text-lg font-bold mb-4">문의글 상세</h3>
          <div className="mb-4">
            <p>
              <strong>제목:</strong> {selectedQuestion.title}
            </p>
            <p>
              <strong>내용:</strong> {selectedQuestion.content}
            </p>
            <p>
              <strong>작성일:</strong> {selectedQuestion.createDate}
            </p>
          </div>
          {selectedQuestion.answerResponse ? (
            <div className="mb-4">
              <h4 className="text-md font-bold">답변</h4>
              <p>
                <strong>내용:</strong> {selectedQuestion.answerResponse.content}
              </p>
              <p>
                <strong>작성일:</strong>{" "}
                {selectedQuestion.answerResponse.createDate}
              </p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleUpdateAnswer(selectedQuestion.id)}
                  className="bg-yellow-500 text-white text-sm px-4 py-2 rounded hover:bg-yellow-600"
                >
                  답변 수정
                </button>
                <button
                  onClick={() =>
                    handleDeleteAnswer(selectedQuestion.answerResponse.id)
                  }
                  className="bg-red-500 text-white text-sm px-4 py-2 rounded hover:bg-red-600"
                >
                  답변 삭제
                </button>
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="text-gray-500">답변이 아직 없습니다.</p>
              <button
                onClick={() => handleCreateAnswer(selectedQuestion.id)}
                className="bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600"
              >
                답변 작성
              </button>
            </div>
          )}
          <button
            onClick={handleCloseDetail}
            className="mt-4 text-sm text-gray-500 underline"
          >
            닫기
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminContactList;
