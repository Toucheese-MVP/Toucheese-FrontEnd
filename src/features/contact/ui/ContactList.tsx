"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";
import AlertModal from "@/features/common/components/AlertModal";
import ContactEdit from "../components/ContactEdit";
import { useQuestionsList } from "../hooks/useQuestionList";
import { useManageQuestions } from "../hooks/useManageQuestions";
import { useFetchQuestion } from "../hooks/useFetchAnswer";
import CommonPagination from "@/features/common/components/pagination";

function ContactList() {
  const { questions, error, setPage, currentPage, totalPages, refetch } =
    useQuestionsList();
  const {
    updateQuestion,
    deleteQuestion,
    loading: managingLoading,
  } = useManageQuestions();
  const { questionDetail, fetchQuestion } = useFetchQuestion();

  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(
    null
  );

  const handleToggleDropdown = async (questionId: number) => {
    if (selectedQuestionId === questionId) {
      setSelectedQuestionId(null);
      return;
    }

    if (!questionDetail || questionDetail.id !== questionId) {
      await fetchQuestion(questionId);
    }
    setSelectedQuestionId(questionId);
  };

  const showModal = (message: string) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const handleModalClose = () => setIsModalOpen(false);

  const openBottomSheet = (question: {
    id: number;
    title: string;
    content: string;
  }) => {
    setSelectedQuestionId(question.id);
    setIsBottomSheetOpen(true);
  };

  const closeBottomSheet = () => {
    setSelectedQuestionId(null);
    setIsBottomSheetOpen(false);
  };

  const handleSave = async (title: string, content: string) => {
    if (selectedQuestionId) {
      await updateQuestion(selectedQuestionId, { title, content });
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

  const handlePageChange = (page: number) => {
    setPage(page);
    refetch(page);
  };

  if (error) return <div>오류 발생: {error}</div>;

  return (
    <div>
      <ContactEdit
        isOpen={isBottomSheetOpen}
        title={questionDetail?.title || ""}
        content={questionDetail?.content || ""}
        onClose={closeBottomSheet}
        onSave={handleSave}
      />

      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={handleModalClose}
      />

      {questions.map((item) => (
        <div key={item.id} className="mb-4">
          <div
            className="cursor-pointer flex flex-col"
            onClick={() => handleToggleDropdown(parseInt(item.id, 10))}
          >
            <div className="flex space-x-2 justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openBottomSheet({
                    id: parseInt(item.id, 10),
                    title: item.title,
                    content: "문의 내용 없음",
                  });
                }}
                disabled={managingLoading}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                수정
              </button>
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
              }}
            />
          </div>

          {selectedQuestionId === parseInt(item.id, 10) && questionDetail && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-primary-1 p-4 rounded-md mt-2 border border-gray-2"
            >
              {questionDetail.answerResponse ? (
                <>
                  <h4 className="font-bold mb-2 text-lg">
                    <span className="font-bold text-primary-5">A. </span>
                    터치즈의 답변
                  </h4>
                  <p className="text-gray-800">
                    {questionDetail.answerResponse.content}
                  </p>
                  <p className="mt-10 text-sm text-gray-5">
                    작성일: {questionDetail.answerResponse.createDate}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-400">답변이 아직 없습니다.</p>
              )}
            </motion.div>
          )}
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
