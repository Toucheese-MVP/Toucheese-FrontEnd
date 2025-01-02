interface AddOption {
  id: number;
  name: string;
  price: number;
}

interface ProductOptionsProps {
  options: AddOption[];
  selectedOptions: AddOption[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<AddOption[]>>;
}
const ProductOptions = ({
  options,
  setSelectedOptions,
}: ProductOptionsProps) => {
  const handleOptionChange = (option: AddOption, isChecked: boolean) => {
    setSelectedOptions((prev: AddOption[]): AddOption[] =>
      isChecked
        ? [...prev, option]
        : prev.filter((item: AddOption) => item.name !== option.name)
    );
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold">추가 옵션</h3>
      <ul className="mt-4">
        {options.map((option, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border-b py-2"
          >
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                className="custom-checkbox"
                onChange={(e) => handleOptionChange(option, e.target.checked)}
              />
              <span>{option.name}</span>
            </label>
            <span>{option.price.toLocaleString()}원</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductOptions;
