"use client";

import { useState } from "react";
import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";
import AlertModal from "@/features/common/components/AlertModal";
import CommonPagination from "@/features/common/components/pagination";
import { useQuestionsList } from "../hooks/useQuestionList";
import { useManageQuestions } from "../hooks/useManageQuestions";

function ContactList() {
  const { questions, error, setPage, currentPage, totalPages, refetch } =
    useQuestionsList();
  const { deleteQuestion, loading: managingLoading } = useManageQuestions();

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const handleDelete = async (questionId: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      await deleteQuestion(questionId);
      showModal("문의 글이 삭제되었습니다.");
      refetch(1);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    refetch(page);
  };

  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />

      {questions.map((item) => (
        <div key={item.id} className="mb-4">
          <div className="cursor-pointer flex flex-col">
            <div className="flex space-x-2 justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(parseInt(item.id, 10));
                }}
                disabled={managingLoading}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                삭제
              </button>
            </div>
            <ContactItem
              contact={{
                id: parseInt(item.id),
                title: item.title,
                status: item.answerStatus,
                author: "작성자",
                date: item.createDate,
                photos: [],
                link: `/contact/${item.id}`,
              }}
            />
          </div>
        </div>
      ))}

      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <ContactNewButton />
    </div>
  );
}

export default ContactList;
