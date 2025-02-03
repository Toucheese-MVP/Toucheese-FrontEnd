"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";
import AlertModal from "@/features/common/components/AlertModal";
import CommonPagination from "@/features/common/components/pagination";
import { useQuestionsList } from "../hooks/useQuestionList";
import { useManageQuestions } from "../hooks/useManageQuestions";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";

function ContactList() {
  const router = useRouter();
  const { questions, error, setPage, currentPage, totalPages, refetch } =
    useQuestionsList();
  const { deleteQuestion, loading } = useManageQuestions();

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

  const handleItemClick = (questionId: number) => {
    router.push(`/contact/${questionId}`);
  };

  if (loading) {
    return (
      <div>
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonLoader key={index} showText={false} />
        ))}
      </div>
    );
  }

  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />

      {questions.map((item) => (
        <div
          key={item.id}
          className="mb-4 cursor-pointer"
          onClick={() => handleItemClick(parseInt(item.id, 10))}
        >
          <div className="flex flex-col">
            <div className="flex space-x-2 justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(parseInt(item.id, 10));
                }}
                disabled={loading}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                삭제
              </button>
            </div>
            <ContactItem
              contact={{
                id: parseInt(item.id),
                title: item.title,
                content: item.content,
                status: item.answerStatus,
                author: "작성자",
                date: item.createDate,
                photos: item.imageUrls,
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
