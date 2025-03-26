import { cookies } from "next/headers";

export async function getQuestionDetail(questionId: number) {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;

  if (!accessToken) {
    console.warn("엑세스 토큰가 존재하지 않거나, 사용할 수 없습니다.");
    return null;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL}/v1/questions/${questionId}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.error("서버와의 통신에 실패 하였습니다.", response.status);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("문의내용을 받아오지 못했습니다.", error);
    return null;
  }
}
