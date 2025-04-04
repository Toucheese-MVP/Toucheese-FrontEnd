import { TopBar } from "@/features/common/components/topbar";
import Link from "next/link";
import UserProfileCard from "@/features/mypage/components/userProfileCard";
import MyPageMenuList from "@/features/mypage/components/myPageMenuList";

const MyPage = () => {
  return (
    <div>
      <TopBar
        message="내정보"
        showBack={false}
        showCart={false}
        showShare={false}
      />
      <div className="bg-white p-6 shadow-sm">
        <UserProfileCard />
      </div>

      <div className="mt-4">
        <MyPageMenuList />
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <Link href="/legal/terms">
          <span className="hover:underline">이용약관</span>
        </Link>
        <span className="mx-2">|</span>
        <Link href="/legal/privacy">
          <span className="hover:underline">개인정보처리방침</span>
        </Link>
      </div>
    </div>
  );
};

export default MyPage;
