"use client";

import { useEffect, useState } from "react";
import { useCreateQuestion } from "../hooks/useCreateQuestion";
import Image from "next/image";

const NewContact = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const { createQuestion, loading } = useCreateQuestion();

  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  useEffect(() => {
    const loadPreviewUrls = async () => {
      const urls = await Promise.all(
        selectedFiles.map(async (file) => await convertFileToBase64(file))
      );
      setPreviewUrls(urls);
    };

    if (selectedFiles.length > 0) {
      loadPreviewUrls();
    }
  }, [selectedFiles]);

  const validateFile = (file: File): boolean => {
    const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png"];
    const MAX_SIZE = 5 * 1024 * 1024;

    const extension = file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(extension || "")) {
      alert(
        `허용되지 않는 확장자입니다. [허용 확장자: ${ALLOWED_EXTENSIONS.join(", ")}]`
      );
      return false;
    }

    if (file.size > MAX_SIZE) {
      alert("파일 크기는 5MB 이하로 업로드해주세요.");
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files).filter(validateFile);

      if (selectedFiles.length + files.length > 5) {
        alert("이미지는 최대 5개까지 첨부할 수 있습니다.");
        return;
      }

      setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
    }
  };

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      await createQuestion({
        title,
        content,
        files: selectedFiles, // 파일 추가
      });

      alert("문의가 등록되었습니다.");
      setTitle("");
      setContent("");
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch (err) {
      console.error(err);
      alert(`문의 등록 중 오류 발생: ${(err as Error).message}`);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 flex-1 flex flex-col">
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="문의 내용을 입력해주세요."
          rows={10}
          className="w-full border border-gray-3 rounded-lg p-2 text-sm focus:outline-none focus:ring focus:ring-btn-color resize-none"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-7 mb-2">
          이미지 첨부
        </label>
        <div className="flex items-center space-x-2">
          <label className="flex flex-col items-center justify-center w-20 h-20 bg-gray-2 rounded-lg cursor-pointer border border-gray-4">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            <span className="text-xs text-gray-5">{`${selectedFiles.length}/5`}</span>
          </label>

          {previewUrls.map((url, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center w-20 h-20 bg-gray-1 rounded-lg overflow-hidden border border-gray-3"
            >
              <Image
                src={url}
                alt={`preview-${index}`}
                className="object-cover w-full h-full"
                fill
              />
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-primary-5 text-black font-medium py-2 rounded-lg shadow hover:bg-yellow-600 transition mt-auto"
      >
        {loading ? "등록 중..." : "문의 등록"}
      </button>
    </div>
  );
};

export default NewContact;
