import { useEffect, useState } from "react";
import { usePaginatedRequest } from "@/features/common/hooks/usePaginationRequest";
import { ReservatedList, Reservation } from "@/types/Reservated.type";

function useReservatedList(initialPage: number = 0) {
  const [allReservations, setAllReservations] = useState<Reservation[]>([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [errorAll, setErrorAll] = useState<string | null>(null);

  const { data, loading, error, refetch } = usePaginatedRequest<ReservatedList>(
    "/v1/members/reservations",
    initialPage
  );

  useEffect(() => {
    const fetchAllReservations = async () => {
      try {
        setLoadingAll(true);
        const allData: Reservation[] = [];
        let currentPage = 0;

        while (true) {
          const result = await refetch(currentPage);

          if (!result || result.content.length === 0) break;
          allData.push(...result.content);
          if (result.last) break;

          currentPage = result.number + 1;
        }

        setAllReservations(allData);
      } catch (err) {
        console.error("전체 데이터를 가져오는 중 오류가 발생했습니다:", err);
        setErrorAll("전체 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAllReservations();
  }, [refetch]);

  return {
    allReservations,
    data,
    loading: loading || loadingAll,
    error: error || errorAll,
    refetch,
  };
}

export default useReservatedList;
