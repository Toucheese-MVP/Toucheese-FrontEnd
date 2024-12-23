"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import useReservatedList from "../hooks/useReservatedList";
import CommonPagination from "@/features/common/components/pagination";

function ReservationPage() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const router = useRouter();

  const [initialPage, setInitialPage] = useState<number>(0);

  useEffect(() => {
    if (!pageParam) {
      router.replace("?page=1");
    } else {
      setInitialPage(parseInt(pageParam, 10) - 1); // 0-based 페이지로 변환
    }
  }, [pageParam, router]);

  const { reservations, currentPage, totalPages, setPage, loading, error } =
    useReservatedList(initialPage);

  const handlePageChange = (page: number) => {
    setPage(page - 1);
    router.push(`?page=${page}`);
  };

  if (loading) return <div>로딩 중...</div>;
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
            <div className="w-12 h-12 rounded-full relative overflow-hidden">
              <Image
                src={reservation.studioImage}
                alt={`${reservation.studioName}`}
                fill
              />
            </div>
            <div className="mr-auto">
              <p className="font-semibold">{reservation.studioName}</p>
              <p className="text-gray-500 font-medium flex gap-1 items-center">
                <Image
                  src="/icons/event.svg"
                  alt="calendar"
                  width={20}
                  height={20}
                  className="object-cover"
                />
                {reservation.createDate}
              </p>
            </div>
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
              <Link
                href={`/review/${reservation.reservationId}`}
                className="px-4 py-4 bg-primary-5 w-1/2 text-center rounded-lg border border-gray-200 font-semibold text-black"
              >
                리뷰 쓰기
              </Link>
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
        currentPage={currentPage + 1} // 1-based 페이지 표시
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default ReservationPage;
