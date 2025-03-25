import { useEffect, useState } from "react";
import { usePaginatedRequest } from "@/features/common/hooks/usePaginationRequest";
import { ReservationPage, Reservation } from "@/types/Reservated.type";

function useReservatedList(initialPage: number = 0) {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data, refetch } = usePaginatedRequest<ReservationPage>(
    "/v1/members/reservations",
    currentPage
  );

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        const result = await refetch(currentPage);

        if (!result || result.content.length === 0) {
          setReservations([]);
          return;
        }

        setReservations(result.content);
      } catch (err) {
        console.error("데이터를 가져오는 중 오류가 발생했습니다:", err);
        setError("데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [currentPage, refetch]);

  return {
    reservations,
    currentPage,
    setPage: setCurrentPage,
    totalPages: data?.totalPages || 0,
    loading,
    error,
  };
}

export default useReservatedList;
