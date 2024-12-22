"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useReservatedList from "../hooks/useReservatedList";
import useCalendarData from "@/features/product/hooks/useCalendar";
import { handleReservationUpdate } from "../hooks/useUpdateReservation";
import ReservationInfo from "../components/ReservationInfo";
import WeekCalendarGrid from "../components/weekCalendar";
import TimeSelector from "../components/TimeSelector";
import ReservationActions from "../components/ReservationAction";
import ReservationDate from "@/features/product/components/ReservationDate";
import Image from "next/image";
import { parseISO } from "date-fns";
import ConfirmModal from "@/features/cart/components/ConfirmModal";

const ReservationEdit = () => {
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState<number>(0);
  const {
    data: reservatedList,
    loading,
    refetch,
  } = useReservatedList(currentPage);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // 날짜 선택 모달 상태
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false); // 컴펌 모달 상태

  const handleDateTimeSelect = (date: string | null, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { reservationId } = useParams();
  const router = useRouter();
  const today = new Date();

  const reservation = reservatedList?.content.find(
    (item) => item.reservationId === Number(reservationId)
  );
  const reservationDate = reservation?.createDate
    ? parseISO(reservation.createDate)
    : today;

  useEffect(() => {
    if (!reservation && reservatedList) {
      const targetPage = Math.floor(Number(reservationId) / pageSize);

      if (targetPage >= reservatedList.totalPages) {
        console.error(
          `잘못된 페이지 요청: ${targetPage}, totalPages: ${reservatedList.totalPages}`
        );
        return;
      }

      setCurrentPage(targetPage);
      refetch(targetPage);
    } else if (reservation) {
      setSelectedDate(reservation.createDate);
    }
  }, [reservationId, reservation, refetch, reservatedList, pageSize]);
  const { calendarData } = useCalendarData(
    reservation?.studioId || 0,
    reservationDate
  );

  const handleUpdateReservation = async () => {
    if (!selectedDate || !selectedTime || !reservation) {
      alert("날짜와 시간을 선택하세요.");
      return;
    }
    setIsConfirmModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    if (selectedDate && selectedTime && reservation) {
      await handleReservationUpdate(
        reservation.reservationId,
        selectedDate,
        selectedTime
      );
      router.push("/reservation");
    }
  };

  const isDayDisabled = (date: Date) => date < today;

  if (loading) {
    return <div className="text-center mt-20">로딩 중...</div>;
  }

  if (!reservation) {
    return (
      <div className="text-center mt-20">예약 정보를 찾을 수 없습니다.</div>
    );
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="p-4 bg-white rounded-lg shadow mb-6 flex flex-col gap-4">
        <ReservationInfo reservation={reservation} />
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className=" flex items-center border border-gray-300 text-gray-500 py-3 px-4 rounded-lg"
          >
            <Image
              src="/icons/event.svg"
              alt="calendar icon"
              width={20}
              height={20}
              className="object-contain mr-2"
            />
            <span>
              {selectedDate && selectedTime
                ? `예약일 ${selectedDate} 예약시간 (${selectedTime})`
                : selectedDate || "날짜를 선택해주세요"}
            </span>
          </button>
        </div>

        <WeekCalendarGrid
          createDate={reservation.createDate}
          selectedDate={selectedDate}
          onDateClick={setSelectedDate}
          isDayDisabled={isDayDisabled}
        />
        <TimeSelector
          calendarData={calendarData}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>

      <ReservationActions
        onCancel={() => router.push("/reservation")}
        onUpdate={handleUpdateReservation}
      />

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <ReservationDate
            studioId={reservation.studioId || 0}
            onDateTimeSelect={handleDateTimeSelect}
            onCloseModal={handleCloseModal}
          />
        </div>
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          message={`\n예약날짜${selectedDate}\n예약시간: ${selectedTime}`}
          onConfirm={() => {
            setIsConfirmModalOpen(false);
            handleConfirmUpdate();
          }}
          onCancel={() => setIsConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ReservationEdit;
