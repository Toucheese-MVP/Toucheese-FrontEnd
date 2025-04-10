import Image from "next/image";

interface MenuItemProps {
  label: string;
  onClick: () => void;
  highlight?: boolean;
}

export const MenuItem = ({
  label,
  onClick,
  highlight = false,
}: MenuItemProps) => (
  <div
    className="bg-white p-4 flex justify-between items-center shadow-sm cursor-pointer mt-2"
    onClick={onClick}
  >
    <span className={highlight ? "text-red-500" : ""}>{label}</span>
    <Image
      src="icons/arrow_forward_ios.svg"
      alt="바로가기"
      width={20}
      height={20}
    />
  </div>
);
