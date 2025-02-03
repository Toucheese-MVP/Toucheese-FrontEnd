"use client";

import { useProductDetail } from "../hooks/usePostProducts";
import { ProductDetailItems } from "@/types/ProductDetailItems.type";
import ProductCoverImage from "./ProductCoverImage";
import ProductSummary from "./ProductSummary";
import ProductOptions from "./ProductOptions";
import ProductPrice from "./ProductPrice";
import ReservationDate from "./ReservationDate";
import OrderButton from "./OrderButton";
import AlertModal from "@/features/common/components/AlertModal";
import Image from "next/image";

interface ProductDetailsProps {
  product: ProductDetailItems;
}

const ProductDetail = ({ product }: ProductDetailsProps) => {
  const {
    selectedDate,
    selectedTime,
    selectedAddOptions,
    isModalOpen,
    setSelectedAddOptions,
    setIsModalOpen,
    handleDateTimeSelect,
    handleCloseModal,
    handleOrder,
    calculateTotalPrice,
    studioId,
    // AlertModal 관련 상태 추가
    alertMessage,
    isAlertOpen,
    setIsAlertOpen,
  } = useProductDetail(product);

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 border shadow-sm rounded-lg">
        <ProductCoverImage product={product} />
        <ProductSummary product={product} studioId={studioId} />
        <ProductPrice product={product} />
      </div>

      <ProductOptions
        options={product.addOptions}
        selectedOptions={selectedAddOptions}
        setSelectedOptions={setSelectedAddOptions}
      />

      {/* 날짜 선택 버튼 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mt-4 bg-gray-2 border text-gray-9 text-left py-2 px-4 rounded-lg w-full flex items-center gap-2"
      >
        <Image
          src="/icons/product/calendar_today.svg"
          alt="예약달력"
          width={20}
          height={20}
        />
        {selectedDate && selectedTime
          ? `예약일 ${selectedDate} 예약시간 (${selectedTime})`
          : "희망 날짜와 시간을 선택해주세요."}
      </button>

      {/* 날짜 선택 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ReservationDate
            studioId={studioId || 0}
            onDateTimeSelect={handleDateTimeSelect}
            onCloseModal={handleCloseModal}
          />
        </div>
      )}

      {/* 주문 버튼 */}
      <OrderButton
        onClick={handleOrder}
        calculateTotalPrice={calculateTotalPrice}
      />

      {/* Alert Modal 추가 */}
      <AlertModal
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
};

export default ProductDetail;
