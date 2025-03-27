"use client";

import { useRouter } from "next/navigation";
import { useHandleReservationUpdate } from "../hooks/useUpdateReservation";

interface Props {
  reservationId: number;
  selectedDate: string | null;
  selectedTime: string | null;
  pageIndex: number;
}

const ReservationActions = ({
  reservationId,
  selectedDate,
  selectedTime,
  pageIndex,
}: Props) => {
  const router = useRouter();
  const { handleReservationUpdate } = useHandleReservationUpdate(); // ✅ 훅 호출 후 함수 사용

  const handleUpdate = async () => {
    if (!selectedDate || !selectedTime || !reservationId) {
      alert("날짜와 시간을 선택하세요.");
      return;
    }

    await handleReservationUpdate(reservationId, selectedDate, selectedTime); // ✅ 함수 호출
    router.push(`/reservation?page=${pageIndex + 1}`);
  };

  const handleCancel = () => {
    router.push(`/reservation?page=${pageIndex + 1}`);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={handleCancel}
        className="px-4 py-4 w-1/2 bg-gray-700 text-white rounded-lg text-center text-lg font-bold"
      >
        예약 취소
      </button>
      <button
        onClick={handleUpdate}
        className="px-4 py-4 w-1/2 bg-yellow-500 text-black rounded-lg text-lg font-bold"
      >
        예약 변경
      </button>
    </div>
  );
};

export default ReservationActions;
