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

  if (response.status === 401) {
    alert("로그인 후 이용 가능한 서비스입니다.");
    const redirectUrl = `/members/login?redirectTo=/products/${reservationData.productId}`;
    window.location.href = redirectUrl;
    return;
  }

  if (!response.ok) {
    throw new Error(`상품담기 실패: ${response.status}`);
  }

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  }

  return null;
};
