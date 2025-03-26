"use client";

import { useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useReservatedList from "../hooks/useReservatedList";
import CommonPagination from "@/features/common/components/pagination";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";
import ReservationCard from "../components/ReservationCard";
import { mapReservationToCardProps } from "../utils/mapReservationToCard";

function ReservationListView() {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || "1"; // 기본값 1
  const router = useRouter();

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
    <>
      {reservations.map((reservation) => (
        <div key={reservation.reservationId}>
          <ReservationCard
            key={reservation.reservationId}
            reservation={mapReservationToCardProps(reservation)}
            currentPage={currentPage}
          />
        </div>
      ))}

      <CommonPagination
        currentPage={currentPage + 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default ReservationListView;
