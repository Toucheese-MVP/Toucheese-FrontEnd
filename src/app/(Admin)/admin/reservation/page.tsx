"use client";

import { useState } from "react";
import Pagination from "../components/pagination";
import { useAdminReservation } from "../hooks/AdminReservation";
import ReservationCheckList from "./ui/ReservationCheckList";

const AdminReservationCheck = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { reservations, totalPages, loading, error, refetch } =
    useAdminReservation(currentPage);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">예약 조회</h1>

      <ReservationCheckList reservations={reservations} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          refetch(page);
        }}
      />
    </div>
  );
};

export default AdminReservationCheck;
