"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useReviewStore } from "@/features/review/store/useReviewStore";
import { ReservationCardProps } from "@/types/Reservation.type";

interface Props {
  reservation: ReservationCardProps;
  currentPage: number;
}

const ReservationActionButtons = ({ reservation, currentPage }: Props) => {
  const router = useRouter();
  const { setReviewData } = useReviewStore();

  if (reservation.status === "촬영완료") {
    return (
      <div className="mt-4 flex justify-between gap-2">
        <Link
          href={`/studios/${reservation.studioId}`}
          className="px-4 py-4 bg-gray-1 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
        >
          스튜디오 홈
        </Link>
        <button
          onClick={() => {
            setReviewData({
              reservationId: reservation.reservationId,
              studioId: reservation.studioId,
              studioName: reservation.studioName,
              studioImage: reservation.studioImage,
              productName: reservation.productName,
              createDate: reservation.createDate,
              createTime: reservation.createTime,
              productId: reservation.productId ?? 1,
            });
            router.push(`/review`);
          }}
          className="px-4 py-4 bg-primary-5 w-1/2 text-center rounded-lg border border-gray-200 font-semibold text-black"
        >
          리뷰 쓰기
        </button>
      </div>
    );
  }

  if (reservation.status === "예약취소") return null;

  return (
    <div className="mt-4 flex justify-between gap-2">
      <Link
        href={`/studios/${reservation.studioId}`}
        className="px-4 py-4 bg-gray-1 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
      >
        스튜디오 홈
      </Link>
      <button
        onClick={() =>
          router.push(
            `/reservation/edit?page=${currentPage + 1}&reservationId=${reservation.reservationId}`
          )
        }
        className="px-4 py-4 bg-gray-1 w-1/2 text-center rounded-lg border border-gray-200 font-semibold"
      >
        예약 수정
      </button>
    </div>
  );
};

export default ReservationActionButtons;
