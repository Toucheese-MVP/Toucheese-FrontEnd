import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseISO } from "date-fns";
import useReservatedList from "./useReservatedList";

export const useReservationEdit = (
  reservationId: string | null,
  pageIndex: number
) => {
  const router = useRouter();
  const { reservations } = useReservatedList(pageIndex);

  const reservation = reservations.find(
    (item) => item.reservationId === Number(reservationId)
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  useEffect(() => {
    if (reservationId && reservations.length > 0) {
      if (reservation) {
        setSelectedDate(reservation.createDate);
        setSelectedTime(reservation.createTime);
      } else {
        router.push(`/reservation?page=${pageIndex + 1}`);
      }
    }
  }, [reservationId, reservations, reservation, pageIndex, router]);

  const reservationDate = reservation?.createDate
    ? parseISO(reservation.createDate)
    : new Date();

  return {
    reservation,
    reservationDate,
    selectedDate,
    selectedTime,
    setSelectedDate,
    setSelectedTime,
  };
};
