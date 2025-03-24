import StudioTitle from "@/components/StudioTitle";
import ReservationActionButtons from "./ReservationActionButtons";
import { ReservationCardProps } from "@/types/Reservation.type";

interface Props {
  reservation: ReservationCardProps;
  currentPage: number;
}

const ReservationCard = ({ reservation, currentPage }: Props) => {
  return (
    <div className="p-4 my-4 rounded-lg border bg-white border-gray-200">
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
      <ReservationActionButtons
        reservation={reservation}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ReservationCard;
