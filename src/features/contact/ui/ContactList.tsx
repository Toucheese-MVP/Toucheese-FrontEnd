"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useManageQuestions } from "../hooks/useManageQuestions";
import AlertModal from "@/features/common/components/AlertModal";
import ContactItem from "../components/ContactItem";
import CommonPagination from "@/features/common/components/pagination";
import { Question } from "../types";
import useRequest from "@/features/common/hooks/useRequest";

interface ContactListProps {
  initialData: {
    content: Question[];
    totalPages: number;
  };
}

function ContactList({ initialData }: ContactListProps) {
  const router = useRouter();
  const { request } = useRequest<{ content: Question[]; totalPages: number }>();
  const { deleteQuestion } = useManageQuestions();

  const [questions, setQuestions] = useState(initialData.content);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialData.totalPages);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const refetch = async (page: number) => {
    try {
      const response = await request(
        "GET",
        "/v1/questions",
        undefined,
        new URLSearchParams({
          page: (page - 1).toString(),
          size: "10",
        })
      );
      setQuestions(response.content);
      setTotalPages(response.totalPages);
      setCurrentPage(page);
    } catch (err) {
      console.error("데이터를 불러오지 못했습니다.", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;
    await deleteQuestion(id);
    setModalMessage("문의 글이 삭제되었습니다.");
    setIsModalOpen(true);
    refetch(currentPage);
  };

  const handleItemClick = (id: number) => {
    router.push(`/contact/${id}`);
  };

  return (
    <div>
      <AlertModal
        isOpen={isModalOpen}
        message={modalMessage}
        onClose={() => setIsModalOpen(false)}
      />

      {questions.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          문의 내용이 없습니다.
        </div>
      ) : (
        questions.map((item) => (
          <div key={item.id} className="mb-4 cursor-pointer">
            <div
              className="flex flex-col"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="flex space-x-2 justify-end">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  className="text-gray-500 text-sm hover:text-gray-700"
                >
                  삭제
                </button>
              </div>
              <ContactItem
                contact={{
                  id: item.id,
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
        ))
      )}

      <CommonPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={refetch}
      />
    </div>
  );
}

export default ContactList;
