interface TotalAmountButtonProps {
  totalAmount: number;
  onClick: () => void;
  disabled?: boolean;
}

export const TotalAmountButton: React.FC<TotalAmountButtonProps> = ({
  totalAmount,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={`bg-primary-5 font-bold px-4 py-2 rounded-lg w-full ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      예약하기 ({totalAmount.toLocaleString()}원)
    </button>
  );
};
