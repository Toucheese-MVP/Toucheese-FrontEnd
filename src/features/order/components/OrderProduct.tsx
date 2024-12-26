import Image from "next/image";
import { CartPaymentItem } from "@/types/Checkout.type";

interface ProductListProps {
  cartPaymentList: CartPaymentItem[];
}
export const OrderProduct: React.FC<ProductListProps> = ({
  cartPaymentList,
}) => {
  if (!cartPaymentList || cartPaymentList.length === 0) {
    return <div>표시할 상품이 없습니다.</div>;
  }

  return (
    <div>
      <h2 className="font-medium text-lg mb-4">상품 확인</h2>
      {cartPaymentList.map((item) => (
        <div
          key={item.cartId}
          className=" bg-white rounded-lg shadow-sm mb-8 p-4"
        >
          <h1 className="text-lg font-semibold mb-4">{item.studioName}</h1>
          <div className="flex items-start gap-4">
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
                <p className="ml-auto">
                  {item.productPrice.toLocaleString()}원
                </p>
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
        </div>
      ))}
    </div>
  );
};
