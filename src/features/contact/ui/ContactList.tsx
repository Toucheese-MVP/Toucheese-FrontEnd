"use client";

import AlertModal from "@/features/common/components/AlertModal";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";
import CommonPagination from "@/features/common/components/pagination";
import ContactItem from "../components/ContactItem";
import ContactNewButton from "../components/ContactNewButton";
import { ContactListViewModel } from "../vm/ContactListViewModel";
import { Fragment } from "react";

function ContactList() {
  const { questions, error, loading, modal, handlers, pagination } =
    ContactListViewModel();

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
        isOpen={modal.isOpen}
        message={modal.message}
        onClose={modal.onClose}
      />

      {questions.length === 0 ? (
        <div className="text-center text-gray-500 py-6">
          문의 내용이 없습니다.
        </div>
      ) : (
        questions.map((item) => (
          <Fragment key={item.id}>
            <div
              className="mb-4 cursor-pointer"
              onClick={() => handlers.handleItemClick(parseInt(item.id, 10))}
            >
              <div className="flex flex-col">
                <div className="flex space-x-2 justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlers.handleDelete(parseInt(item.id, 10));
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
            <CommonPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlers.handlePageChange}
            />
          </Fragment>
        ))
      )}

      <ContactNewButton />
    </div>
  );
}

export default ContactList;
