"use client";

import { TopBar } from "@/features/common/components/topbar";
import StarRating from "@/features/review/components/StarRating";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useReviewStore } from "@/features/review/store/useReviewStore";
import { usePostReview } from "@/features/review/hooks/usePostReview";

function Review() {
  const { reviewData } = useReviewStore();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const studioId = reviewData?.studioId ?? 0;
  const productId = reviewData?.productId ?? 1;
  const { createReview, loading } = usePostReview(studioId, productId);

  const convertFileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
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

  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }
    if (rating === 0) {
      alert("별점을 선택해주세요.");
      return;
    }
    if (selectedFiles.length === 0) {
      alert("최소 한 개 이상의 이미지를 업로드해주세요.");
      return;
    }

    try {
      await createReview({
        content,
        rating,
        uploadFiles: selectedFiles, // ✅ 이미지 파일 전달
      });

      alert("리뷰가 등록되었습니다.");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("리뷰 작성 중 오류가 발생했습니다.");
    }
  };

  if (!reviewData) {
    return (
      <div className="text-center mt-10 text-gray-500">
        예약 정보가 없습니다.
      </div>
    );
  }

  return (
    <>
      <TopBar
        message={reviewData.studioName}
        showShare={false}
        showCart={false}
      />
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 p-4 shadow-md rounded-lg">
          <div className="relative w-12 aspect-square rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={reviewData.studioImage}
              alt={reviewData.studioName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex font-bold">
              <p>{reviewData.productName}</p>
            </div>
            <p>
              예약일자 : {reviewData.createDate} {reviewData.createTime}
            </p>
          </div>
        </div>

        <div className="py-4 border-y-8 border-gray-1">
          <h3 className="text-xl">
            <span className="font-bold">
              {reviewData.studioName} <br />
            </span>
            촬영 경험은 어떠셨나요?
          </h3>
          <div className="flex py-2">
            <StarRating maxStars={5} onChange={setRating} />
          </div>
          {rating > 0 && (
            <p className="text-gray-600">선택한 별점: {rating}점</p>
          )}
        </div>

        <div>
          <h3 className="font-semibold">리뷰 작성</h3>
          <textarea
            className="p-4 resize-none w-full border border-gray-2 mt-5 rounded-xl text-sm min-h-48 focus:border-primary-4 outline-none"
            placeholder="리뷰 내용을 입력해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        {/* 이미지 업로드 */}
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

        <div className="flex gap-4">
          <button className="p-4 text-center w-full rounded-lg font-semibold text-lg text-white bg-gray-7">
            작성 취소
          </button>
          <button
            onClick={handleSubmit}
            className="p-4 text-center w-full rounded-lg font-semibold text-lg bg-primary-4"
            disabled={loading}
          >
            {loading ? "작성 중..." : "작성 완료"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
