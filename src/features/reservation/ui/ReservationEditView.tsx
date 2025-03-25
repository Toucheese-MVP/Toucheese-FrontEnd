"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useReservationEdit } from "../hooks/useReservationEdit";
import useCalendarData from "@/features/product/hooks/useCalendar";
import ReservationInfo from "../components/ReservationInfo";
import WeekCalendar from "../components/weekCalendar";
import TimeSelector from "../components/TimeSelector";
import ReservationActions from "../components/ReservationAction";
import ReservationDate from "@/features/product/components/ReservationDate";
import { useQueryParams } from "@/utils/useQueryParams";

const ReservationEditView = () => {
  const router = useRouter();
  const { id: reservationId, pageIndex } = useQueryParams("reservationId");

  const {
    reservation,
    reservationDate,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
  } = useReservationEdit(reservationId, pageIndex);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { calendarData } = useCalendarData(
    reservation?.studioId || 0,
    reservationDate
  );

  const handleDateTimeSelect = (date: string | null, time: string | null) => {
    setSelectedDate(date);
    setSelectedTime(time);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!reservation) {
    return (
      <div className="text-center mt-20">
        예약 정보를 찾을 수 없습니다. <br />
        <button
          onClick={() => router.push(`/reservation?page=${pageIndex + 1}`)}
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="p-4 bg-white rounded-lg shadow mb-6 flex flex-col gap-4">
        <ReservationInfo reservation={reservation} />
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center border border-gray-300 text-gray-500 py-3 px-4 rounded-lg"
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

        <WeekCalendar
          createDate={reservation.createDate}
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />
        <TimeSelector
          calendarData={calendarData}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onChange={setSelectedTime}
        />
      </div>
      <ReservationActions
        reservationId={reservation.reservationId}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        pageIndex={pageIndex}
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
    </div>
  );
};

export default ReservationEditView;
