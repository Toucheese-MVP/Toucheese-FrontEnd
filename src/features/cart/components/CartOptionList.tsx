import { SelectAddOption } from "@/types/Cart.type";

interface OptionListProps {
  options: SelectAddOption[];
}

const CartOptionList: React.FC<OptionListProps> = ({ options }) => {
  if (options.length === 0) {
    return <p className="text-gray-500">선택된 옵션이 없습니다.</p>;
  }

  return (
    <ul>
      {options.map((option) => (
        <li key={option.selectOptionId} className="text-gray-500">
          {option.selectOptionName} -{" "}
          {option.selectOptionPrice.toLocaleString()}원
        </li>
      ))}
    </ul>
  );
};

export default CartOptionList;
