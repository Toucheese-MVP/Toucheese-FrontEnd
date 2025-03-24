export interface ReservationCardProps {
  reservationId: number;
  studioId: number;
  studioName: string;
  studioImage: string;
  productName: string;
  createDate: string;
  createTime: string;
  status: "예약확정" | "촬영완료" | "예약취소";
  productId: number;
}
