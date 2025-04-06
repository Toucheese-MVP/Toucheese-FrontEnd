import { cookies } from "next/headers";
import { TopBar } from "@/features/common/components/topbar";
import ReservationListView from "@/features/reservation/ui/ReservationListView";
import LoginRequired from "@/features/common/components/loginRequired";

async function Page() {
  const cookieStore = cookies();
  const accessToken = (await cookieStore).get("accessToken")?.value;
  const isLoggedIn = !!accessToken;

  return (
    <>
      {isLoggedIn ? (
        <div className="-mx-4 p-4 flex-1">
          <TopBar
            message="예약일정"
            showCart={false}
            showShare={false}
            showBack={false}
          />
          <ReservationListView />
        </div>
      ) : (
        <LoginRequired
          message="예약 일정을 확인하려면 로그인이 필요합니다."
          redirectTo="/members/login?redirect=/reservation"
        />
      )}
    </>
  );
}

export default Page;
