"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import useReservatedList from "../hooks/useReservatedList";
import CommonPagination from "@/features/common/components/pagination";
import StudioTitle from "@/components/StudioTitle";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";
import { useReviewStore } from "@/features/review/store/useReviewStore";

function ReservationPage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1"; // 기본값 1
  const router = useRouter();
  const { setReviewData } = useReviewStore();

  const initialPage = useMemo(() => parseInt(pageParam, 10) - 1, [pageParam]);

  const { reservations, currentPage, totalPages, setPage, loading, error } =
    useReservatedList(initialPage);

  useEffect(() => {
    setPage(initialPage);
  }, [initialPage, setPage]);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  if (loading) {
    return (
      <div>
        {Array.from({ length: 1 }).map((_, index) => (
          <SkeletonLoader key={index} showText={false} />
        ))}
      </div>
    );
  }
  if (error) return <div>에러가 발생했습니다: {error}</div>;
  if (!reservations || reservations.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        현재 예약된 상품이 없습니다.
      </div>
    );
  }

  return (
    <div>
      {reservations.map((reservation) => (
        <div
          key={reservation.reservationId}
          className="p-4 my-4 rounded-lg border bg-white border-gray-200"
        >
          <div className="relative flex items-center justify-between gap-3">
            <StudioTitle
              name={reservation.studioName}
              profileImage={reservation.studioImage}
              createDate={reservation.createDate}
              size="md"
            />

            <div
              className={`self-start px-2 py-1 mt-2 rounded-lg border border-gray-200 bg-gray-200 font-medium ${
                reservation.status === "예약확정"
                  ? "bg-yellow-500 text-black"
                  : reservation.status === "촬영완료"
                    ? "text-blue-500"
                    : reservation.status === "예약취소"
                      ? "text-red-500"
                      : "text-black"
              }`}
            >
              {reservation.status}
            </div>
          </div>
          {reservation.status === "촬영완료" ? (
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
          ) : reservation.status === "예약취소" ? null : (
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
          )}
        </div>
      ))}

      <CommonPagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReservationPage;
