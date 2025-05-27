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
    <div className="mt-4">
      <h3 className="text-lg font-semibold">추가 옵션</h3>
      <ul>
        {options.length > 0 ? (
          options.map((option, idx) => (
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
          ))
        ) : (
          <span className=" text-gray-500">
            해당 촬영은 추가옵션이 없습니다.
          </span>
        )}
      </ul>
    </div>
  );
};

export default ProductOptions;
