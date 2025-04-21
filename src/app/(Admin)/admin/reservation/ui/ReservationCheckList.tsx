import { useHandleStatusChange } from "../../hooks/handleStatusChange";
import { Reservation } from "../../types/Admin.types";
import { format } from "date-fns";

type ReservationListProps = {
  reservations: Reservation[];
};

const ReservationCheckList: React.FC<ReservationListProps> = ({
  reservations,
}) => {
  const { handleStatusChange } = useHandleStatusChange();
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="hidden md:table min-w-full text-sm text-gray-800 border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-2 py-2 text-center">이름</th>
            <th className="px-2 py-2 text-center">전화번호</th>
            <th className="px-2 py-2 text-center">스튜디오 이름</th>
            <th className="px-2 py-2 text-center">예약 내용</th>
            <th className="px-2 py-2 text-center">예약 날짜</th>
            <th className="px-2 py-2 text-center">예약 시간</th>
            <th className="px-2 py-2 text-center">총 가격</th>
            <th className="px-2 py-2 text-center">상품 가격</th>
            <th className="px-2 py-2 text-left">선택 옵션</th>
            <th className="px-2 py-2 text-center">예약 상태</th>
            <th className="px-2 py-2 text-center">신청 일자</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-gray-100" : "bg-white"
              } hover:bg-gray-50`}
            >
              <td className="py-4 px-2 border-r text-center">
                {reservation.customerName}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.customerPhone}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.studioName}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.productName}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.createDate}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.createTime}
              </td>
              <td className="py-4 px-2 border-r text-center">
                {reservation.totalPrice}
              </td>
              <td className="py-4 my-2 border-r text-center">
                {reservation.productPrice}
              </td>
              <td>
                {!reservation.selectAddOptions ||
                reservation.selectAddOptions.length === 0 ? (
                  <p className=" px-2 py-1 text-left border-r">
                    선택된 옵션이 없습니다.
                  </p>
                ) : (
                  reservation.selectAddOptions.map((selectAddOption) => (
                    <p
                      key={selectAddOption.selectOptionId}
                      className="px-2 py-1 text-left border-r"
                    >
                      {selectAddOption.selectOptionName} -{" "}
                      {selectAddOption.selectOptionPrice}원
                    </p>
                  ))
                )}
              </td>
              <td className="px-4 py-2 font-semibold">
                <select
                  name="status"
                  id={`status-${reservation.reservationId}`}
                  className="px-4 py-2 border rounded-md"
                  defaultValue={reservation.status}
                  onChange={(e) =>
                    handleStatusChange(
                      reservation.reservationId,
                      e.target.value
                    )
                  }
                >
                  <option value="예약접수">예약접수</option>
                  <option value="예약확정">예약확정</option>
                  <option value="예약취소">예약취소</option>
                  <option value="촬영완료">촬영완료</option>
                </select>
              </td>
              <td className="py-4 px-2 border-r text-center">
                {format(
                  new Date(reservation.reservationCompletedAt),
                  "yyyy-MM-dd HH:mm"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="md:hidden">
        {reservations.map((reservation, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded-lg shadow ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <p className="font-semibold">이름: {reservation.customerName}</p>
            <p>전화번호: {reservation.customerPhone}</p>
            <p>스튜디오 이름: {reservation.studioName}</p>
            <p>예약 날짜: {reservation.createDate}</p>
            <p>예약 시간: {reservation.createTime}</p>
            <p>총 가격: {reservation.totalPrice}원</p>
            <details>
              <summary className="cursor-pointer font-semibold text-blue-600">
                상세 내용 보기
              </summary>
              <p>상품 이름: {reservation.productName}</p>
              <p>상품 가격: {reservation.productPrice}원</p>
              <p>선택 옵션:</p>
              {reservation.selectAddOptions.map((selectAddOption) => (
                <p key={selectAddOption.selectOptionId} className="ml-4">
                  - {selectAddOption.selectOptionName} (
                  {selectAddOption.selectOptionPrice}원)
                </p>
              ))}
              <div className="mt-2">
                <label htmlFor={`status-${reservation.reservationId}`}>
                  예약 상태:
                </label>
                <select
                  name="status"
                  id={`status-${reservation.reservationId}`}
                  className="px-3 py-2 border rounded-md"
                  defaultValue={reservation.status}
                  onChange={(e) =>
                    handleStatusChange(
                      reservation.reservationId,
                      e.target.value
                    )
                  }
                >
                  <option value="예약접수">예약접수</option>
                  <option value="예약확정">예약확정</option>
                  <option value="예약취소">예약취소</option>
                </select>
              </div>
            </details>
            <p>
              신청 일자:{" "}
              {format(
                new Date(reservation.reservationCompletedAt),
                "yyyy-MM-dd HH:mm"
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationCheckList;
