import Image from "next/image";

interface ItemDetailsProps {
  studioName: string;
  productName: string;
  personnel: number;
  reservationDate: string;
  reservationTime: string;
  totalPrice: number;
  isSelected: boolean;
  onSelect: (isSelected: boolean) => void;
}

const CartItemDetails: React.FC<ItemDetailsProps> = ({
  studioName,
  productName,
  personnel,
  reservationDate,
  reservationTime,
  totalPrice,
  isSelected,
  onSelect,
}) => (
  <div className="flex flex-col flex-1">
    <div className="flex items-center">
      <h1 className="text-lg font-bold">{studioName}</h1>
      <input
        type="checkbox"
        checked={isSelected}
        onChange={(e) => onSelect(e.target.checked)}
        className="custom-checkbox ml-auto"
      />
    </div>
    <p>{productName}</p>
    <p className="text-gray-500 flex relative">
      <Image
        src="/icons/person.svg"
        alt="예약인원"
        width={20}
        height={20}
        className="aspect-square"
      />
      예약 인원: {personnel}명
    </p>
    <p className="text-gray-500 flex relative">
      <Image src="/icons/event.svg" alt="예약날짜" width={20} height={20} />
      예약 날짜: {reservationDate}
    </p>
    <p className="text-gray-500 flex">예약 시간: {reservationTime}</p>
    <p className="text-lg font-bold mt-auto ml-auto">
      총 {totalPrice.toLocaleString()}원
    </p>
  </div>
);

export default CartItemDetails;
