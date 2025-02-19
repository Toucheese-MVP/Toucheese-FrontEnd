"use client";

import { useState } from "react";

interface OrderButtonProps {
  calculateTotalPrice: () => number;
  onClick: () => void;
}

const OrderButton = ({ calculateTotalPrice, onClick }: OrderButtonProps) => {
  const totalPrice = calculateTotalPrice();
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = () => {
    if (isDisabled) return;

    setIsDisabled(true);
    onClick();

    setTimeout(() => {
      setIsDisabled(false);
    }, 300);
  };

  return (
    <div className="mt-4">
      <button
        className="w-full bg-primary-5 text-gray-9 py-2 rounded-lg font-bold text-lg disabled:opacity-50"
        onClick={handleClick}
        disabled={isDisabled}
      >
        <span className="mr-2">
          선택상품주문 ( {totalPrice.toLocaleString()} )원
        </span>
      </button>
    </div>
  );
};

export default OrderButton;
