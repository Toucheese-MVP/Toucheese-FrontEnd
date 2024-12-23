"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
  const searchParams = useSearchParams();
  const router = useRouter();

  const reservationId = searchParams.get("reservationId");
  const savedPage = parseInt(localStorage.getItem("currentPage") || "0", 10);
  const { reservations } = useReservatedList(savedPage);

  const reservation = reservations.find(
    (item) => item.reservationId === Number(reservationId)
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (reservationId && reservations.length > 0) {
      const foundReservation = reservations.find(
        (item) => item.reservationId === Number(reservationId)
      );
      if (foundReservation) {
        setSelectedDate(foundReservation.createDate);
        setSelectedTime(foundReservation.createTime);
      } else {
        console.error(
          `예약 정보를 찾을 수 없습니다: reservationId=${reservationId}`
        );
        router.push(`/reservation?page=${savedPage + 1}`);
      }
    }
  }, [reservationId, reservations, router, savedPage]);

  const today = new Date();
  const reservationDate = reservation?.createDate
    ? parseISO(reservation.createDate)
    : today;

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
      router.push(`/reservation?page=${savedPage + 1}`);
    }
  };

  const isDayDisabled = (date: Date) => date < today;

  if (!reservation) {
    return (
      <div className="text-center mt-20">
        예약 정보를 찾을 수 없습니다. <br />
        <button
          onClick={() => router.push(`/reservation?page=${savedPage + 1}`)}
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
        onCancel={() => router.push(`/reservation?page=${savedPage + 1}`)}
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
          message={`\n예약날짜 ${selectedDate}\n예약시간: ${selectedTime}`}
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
