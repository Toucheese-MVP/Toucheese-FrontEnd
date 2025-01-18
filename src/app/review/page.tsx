"use client";

import { TopBar } from "@/features/common/components/topbar";
import StarRating from "@/features/review/components/StarRating";
import Image from "next/image";
import { useEffect, useState } from "react";

const item = {
  cartId: 74,
  studioName: "루케필름스튜디오",
  productImage: "https://i.toucheese-macwin.store/resized/fnzp2.webp",
  productName: "컬러 증명사진",
  productPrice: 35000,
  personnel: 1,
  reservationDate: "2025-02-20",
  reservationTime: "11:00",
  totalPrice: 105000,
  selectAddOptions: [
    {
      selectOptionId: 1,
      selectOptionName: "추가인화",
      selectOptionPrice: 10000,
    },
    {
      selectOptionId: 2,
      selectOptionName: "고해상 보정본/원본 1장",
      selectOptionPrice: 10000,
    },
    {
      selectOptionId: 3,
      selectOptionName: "고해상 원본 전체",
      selectOptionPrice: 30000,
    },
    {
      selectOptionId: 4,
      selectOptionName: "추가보정",
      selectOptionPrice: 20000,
    },
  ],
};

function Review() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [rating, setRating] = useState(0);

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
  const removeFile = (index: number) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setPreviewUrls((prevUrls) => prevUrls.filter((_, i) => i !== index));
  };

  return (
    <>
      <TopBar message="스튜디오명" showShare={false} showCart={false} />
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-4 p-4 shadow-md rounded-lg">
          <div className="relative w-32 aspect-3/4 rounded-lg overflow-hidden bg-gray-200">
            <Image
              src={item.productImage}
              alt={item.productName}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex font-bold">
              <p>{item.productName}</p>
              <p className="ml-auto">{item.productPrice.toLocaleString()}원</p>
            </div>
            {item.selectAddOptions.length > 0 && (
              <div className="py-2 text-gray-6">
                <ul>
                  {item.selectAddOptions.map((option) => (
                    <li
                      key={option.selectOptionId}
                      className="flex justify-between flex-wrap"
                    >
                      <p>{option.selectOptionName}</p>
                      <p> {option.selectOptionPrice.toLocaleString()}원</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p>예약인원 : {item.personnel}명</p>
            <p>
              예약일자 : {item.reservationDate} {item.reservationTime}
            </p>
            <p className="mt-4 text-right font-bold text-xl">
              상품가격: {item.totalPrice.toLocaleString()}원
            </p>
          </div>
        </div>
        <div className="py-4 border-y-8 border-gray-1">
          <h3 className="text-xl">
            <span className="font-bold">
              {item.studioName} <br />
            </span>
            촬영 경험은 어떠셨나요?
          </h3>
          <div className="flex py-2">
            <StarRating maxStars={5} onChange={setRating} />
          </div>
          {rating > 0 && (
            <p className=" text-gray-600">선택한 별점: {rating}점</p>
          )}
        </div>
        <div>
          <h3 className="font-semibold">리뷰작성</h3>
          <textarea
            name=""
            id=""
            className="p-4 resize-none w-full border border-gray-2 mt-5 rounded-xl text-sm min-h-48 focus:border-primary-4 outline-none"
            placeholder="리뷰 용내을 입력해주세요."
          ></textarea>
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
        <div className="flex gap-4">
          <button className="p-4 text-center w-full rounded-lg font-semibold text-lg text-white  bg-gray-7">
            작성 취소
          </button>
          <button className="p-4 text-center w-full rounded-lg font-semibold text-lg  bg-primary-4">
            작성 완료
          </button>
        </div>
      </div>
    </>
  );
}

export default Review;
