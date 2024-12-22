"use client";

import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";
import AlertModal from "@/features/common/components/AlertModal";
import ContactEdit from "../components/ContactEdit";
import { useQuestionsList } from "../hooks/useQuestionList";
import { useManageQuestions } from "../hooks/useManageQuestions";
import { useState } from "react";

function ContactList() {
  const {
    questions,
    loading,
    error,
    setPage,
    currentPage,
    totalPages,
    refetch,
  } = useQuestionsList();
  const {
    updateQuestion,
    deleteQuestion,
    loading: managingLoading,
  } = useManageQuestions();

  const [modalMessage, setModalMessage] = useState<string>("");

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<{
    id: number;
    title: string;
    content: string;
  } | null>(null);

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const openBottomSheet = (question: {
    id: number;
    title: string;
    content: string;
  }) => {
    setSelectedQuestion(question);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setSelectedQuestion(null);
    setIsBottomSheetOpen(false);
  };

  const handleSave = async (title: string, content: string) => {
    if (selectedQuestion) {
      await updateQuestion(selectedQuestion.id, { title, content });
      showModal("문의 글이 수정되었습니다.");
      closeBottomSheet();
      refetch(currentPage);
    }
  };

  const handleDelete = async (questionId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteQuestion(questionId);
      showModal("문의 글이 삭제되었습니다.");
      refetch(1);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>오류 발생: {error}</div>;
  }

  return (
    <div>
      <ContactEdit
        isOpen={isBottomSheetOpen}
        title={selectedQuestion?.title || ""}
        content={selectedQuestion?.content || ""}
        onClose={closeBottomSheet}
        onSave={handleSave}
      />

      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />

      {questions.map((item) => (
        <div key={item.id} className="mb-4 flex flex-col">
          <div className="ml-auto flex space-x-2">
            <button
              onClick={() =>
                openBottomSheet({
                  id: parseInt(item.id, 10),
                  title: item.title,
                  content: "문의 내용 없음", // 실제 데이터를 바인딩
                })
              }
              disabled={managingLoading}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              수정
            </button>
            <button
              onClick={() => handleDelete(parseInt(item.id, 10))}
              disabled={managingLoading}
              className="text-gray-500 text-sm hover:text-gray-700"
            >
              삭제
            </button>
          </div>
          {/* Contact Item */}
          <ContactItem
            contact={{
              id: parseInt(item.id),
              title: item.title,
              status: item.answerStatus,
              author: "작성자",
              date: item.createDate,
              photos: [],
            }}
          />
        </div>
      ))}

      <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-gray-200 rounded disabled:opacity-50"
        >
          이전
        </button>
        <button
          onClick={() => setPage(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          다음
        </button>
      </div>

      <ContactNewButton />
    </div>
  );
}

export default ContactList;
