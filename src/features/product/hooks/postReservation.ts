import { getCookie } from "@/utils/cookieUtils/cookieUtils";

export interface ReservationData {
  productId: number;
  studioId: number;
  totalPrice: number;
  createDate: string;
  createTime: string;
  personnel: number;
  addOptions: number[];
}

export const postReservation = async (reservationData: ReservationData) => {
  const token = getCookie("refreshToken");

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/members/carts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reservationData),
      }
    );

    if (!response.ok) {
      throw new Error(`상품담기 실패: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }

    return null;
  } catch (error) {
    console.error("예약 요청 중 오류 발생:", error);
    throw error;
  }
};
