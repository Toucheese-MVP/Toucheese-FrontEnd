import { Reservation } from "@/types/Reservated.type";
import StudioTitle from "@/components/StudioTitle";

const ReservationInfo = ({ reservation }: { reservation: Reservation }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">기존 예약 정보</h2>
      <div className="py-4 bg-white my-4 border-b border-gray-100">
        <div className="relative flex items-center justify-between gap-3">
          <StudioTitle
            name={reservation.studioName}
            profileImage={`${reservation.studioImage}`}
            createDate={reservation.createDate}
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
      </div>
    </div>
  );
};

export default ReservationInfo;
