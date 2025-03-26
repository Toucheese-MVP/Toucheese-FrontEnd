// utils/mapReservationToCard.ts
import { ReservationDTO } from "@/types/dto/Reservation.dto";
import { ReservationCardProps } from "@/types/Reservation.type";

const VALID_STATUS = ["예약확정", "촬영완료", "예약취소"] as const;

export function mapReservationToCardProps(
  dto: ReservationDTO
): ReservationCardProps {
  return {
    ...dto,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: VALID_STATUS.includes(dto.status as any)
      ? (dto.status as ReservationCardProps["status"])
      : "예약확정", // fallback 처리
  };
}
