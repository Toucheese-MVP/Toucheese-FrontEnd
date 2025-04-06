"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "@/utils/cookieUtils/cookieUtils";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";
import Link from "next/link";

type UserData = {
  name: string;
  email: string;
  phone: string;
};

const UserProfileCard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = getCookie("accessToken");
        if (!token) return;

        const res = await axios.get<UserData>(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/members`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error("유저 정보 요청 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <SkeletonLoader />;

  return user ? (
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex justify-center items-center">
        <span className="text-gray-500">사진</span>
      </div>
      <div>
        <div className="font-bold text-lg">{user.name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
        <div className="text-sm text-gray-500">{user.phone}</div>
      </div>
    </div>
  ) : (
    <div className="text-center">
      <Link
        href="/members/login"
        className="py-2 px-12 bg-primary-5 text-gray-1 font-semibold rounded-md"
      >
        로그인
      </Link>
    </div>
  );
};

export default UserProfileCard;
