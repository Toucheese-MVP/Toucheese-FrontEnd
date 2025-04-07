import useRequest from "@/features/common/hooks/useRequest";

export function useHandleStatusChange() {
  const { request } = useRequest();

  const handleStatusChange = async (reservationId: number, status: string) => {
    try {
      const payload = { status };
      await request(
        "PUT",
        `/v1/admin/reservations/${reservationId}/status`,
        payload
      );

      alert("예약 상태가 성공적으로 변경되었습니다.");
    } catch (error) {
      console.error("예약 상태 변경 중 오류 발생:", error);
      alert("예약 상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return { handleStatusChange };
}
