"use client";
import { useEffect, useState } from "react";

interface ContactEditProps {
  isOpen: boolean;
  title: string;
  content: string;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

const ContactEdit = ({
  isOpen,
  title,
  content,
  onClose,
  onSave,
}: ContactEditProps) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newContent, setNewContent] = useState(content);

  useEffect(() => {
    setNewTitle(title);
    setNewContent(content);
  }, [title, content]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end items-end">
      <div className="bg-white w-full mx-auto max-w-custom p-6 rounded-t-lg">
        <h2 className="text-lg font-bold mb-4">문의 수정</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-7 mb-2"
          >
            제목
          </label>
          <input
            type="text"
            id="title"
            value={newTitle} // 수정된 부분
            onChange={(e) => setNewTitle(e.target.value)} // 수정된 부분
            placeholder="제목을 입력해주세요."
            className="w-full border border-gray-3 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-btn-color"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-7 mb-2"
          >
            문의 내용
          </label>
          <textarea
            id="description"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            placeholder="문의 내용을 입력해주세요."
            rows={10}
            className="w-full border border-gray-3 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-btn-color resize-none"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 w-1/2 text-gray-500 bg-gray-100 rounded-lg"
          >
            취소
          </button>
          <button
            onClick={() => onSave(newTitle, newContent)}
            className="px-4 py-2 w-1/2 bg-primary-5
             rounded-lg hover:bg-primary-6"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactEdit;
