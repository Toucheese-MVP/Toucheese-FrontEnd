import ReservationEditWrapper from "@/features/reservation/ui/ReservationWrapper";

async function ReservationEditRoutePage({
  params,
}: {
  params: { reservationId: string };
}) {
  const reservationIdString = params.reservationId;
  console.log("reservationIdString:", reservationIdString);

  return <ReservationEditWrapper />;
}

export default ReservationEditRoutePage;
