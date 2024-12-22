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
    <div className="mb-6">
      <h2 className="text-md font-bold">상품 확인</h2>
      {cartPaymentList.map((item) => (
        <div key={item.cartId} className=" p-4 mb-4 rounded">
          <div className="flex mb-4">
            <div className="relative max-w-48 w-full h-full aspect-3/4 overflow-hidden rounded-lg bg-gray-200">
              <Image
                src={item.productImage}
                alt={item.productName}
                fill
                className="object-cover"
              />
            </div>
            <div className="ml-4 flex flex-col ">
              <p className="font-bold"></p>
              <p className="text-lg font-bold ">{item.studioName}</p>
              <p>
                {item.productName}: {item.productPrice.toLocaleString()}원
              </p>
              {item.selectAddOptions.length > 0 && (
                <div className="py-2 border-b">
                  <p className="text-md font-bold ">추가 옵션:</p>
                  <ul>
                    {item.selectAddOptions.map((option) => (
                      <li key={option.selectOptionId}>
                        {option.selectOptionName} (+
                        {option.selectOptionPrice.toLocaleString()}원)
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <p>인원: {item.personnel}명</p>
              <p>예약일 : {item.reservationDate}</p>
              <p>예약시간 :{item.reservationTime}</p>
              <p className="mt-auto font-bold text-lg">
                상품가격: {item.totalPrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
