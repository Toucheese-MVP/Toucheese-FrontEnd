import useRequest from "@/features/common/hooks/useRequest";

export function useHandleReservationUpdate() {
  const { request } = useRequest();

  const handleReservationUpdate = async (
    reservationId: number,
    createDate: string,
    createTime: string
  ) => {
    try {
      const payload = { createDate, createTime };
      await request(
        "PUT",
        `/v1/members/reservations/${reservationId}`,
        payload
      );
      alert("예약 일정이 성공적으로 수정되었습니다.");
    } catch (error) {
      console.error("예약 일정 수정 중 오류 발생:", error);
      alert("예약 일정 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { handleReservationUpdate };
}
