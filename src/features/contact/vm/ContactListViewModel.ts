// features/contact/vm/ContactListViewModel.ts
import { useQuestionsList } from "../hooks/useQuestionList";
import { useManageQuestions } from "../hooks/useManageQuestions";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ContactListViewModel() {
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

  return {
    questions,
    error,
    loading,
    modal: {
      isOpen: isModalOpen,
      message: modalMessage,
      onClose: handleModalClose,
    },
    handlers: {
      handleDelete,
      handlePageChange,
      handleItemClick,
    },
    pagination: {
      currentPage,
      totalPages,
    },
  };
}
