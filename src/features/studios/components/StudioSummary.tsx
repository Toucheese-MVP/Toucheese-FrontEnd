import StudioTitle from "@/components/StudioTitle";
import Image from "next/image";
import { useState, useMemo } from "react";

function StudioSummary({
  profileImage,
  name,
  totalReviews,
  address,
  operatingHours,
  notice,
}: {
  profileImage: string;
  name: string;
  totalReviews: number;
  description?: string;
  address: string;
  operatingHours: { dayOfWeek: string; openTime: string; closeTime: string }[];
  notice: string;
}) {
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const todayIndex = new Date().getDay();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const today = daysOfWeek[todayIndex];

  const processedOperatingHours = useMemo(() => {
    return operatingHours.map((item) => {
      if (item.openTime === "0:00" && item.closeTime === "0:00") {
        return { ...item, openTime: "24시간", closeTime: "" };
      }
      return item;
    });
  }, [operatingHours]);

  const todayOperatingHours = processedOperatingHours.find(
    (item) => item.dayOfWeek === today
  );

  const isOpen = useMemo(() => {
    if (!todayOperatingHours || todayOperatingHours.openTime === "휴무") {
      return false;
    }

    if (todayOperatingHours.openTime === "24시간") {
      return true;
    }

    const [openHours, openMinutes] = todayOperatingHours.openTime
      .split(":")
      .map(Number);
    const [closeHours, closeMinutes] = todayOperatingHours.closeTime
      .split(":")
      .map(Number);

    const openTime = openHours * 60 + openMinutes;
    const closeTime = closeHours * 60 + closeMinutes;

    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    return currentMinutes >= openTime && currentMinutes < closeTime;
  }, [todayOperatingHours]);

  const isClosed = useMemo(() => {
    if (!todayOperatingHours || todayOperatingHours.openTime === "휴무") {
      return false;
    }

    if (todayOperatingHours.openTime === "24시간") {
      return false; // 24시간 운영일 경우 "영업 종료" 표시 없음
    }

    const [closeHours, closeMinutes] = todayOperatingHours.closeTime
      .split(":")
      .map(Number);

    const closeTime = closeHours * 60 + closeMinutes;

    const currentTime = new Date();
    const currentMinutes =
      currentTime.getHours() * 60 + currentTime.getMinutes();

    return currentMinutes >= closeTime;
  }, [todayOperatingHours]);

  const sortedOperatingHours = useMemo(() => {
    const todayIndexInData = processedOperatingHours.findIndex(
      (item) => item.dayOfWeek === today
    );
    if (todayIndexInData === -1) return processedOperatingHours;

    return [
      ...processedOperatingHours.slice(todayIndexInData),
      ...processedOperatingHours.slice(0, todayIndexInData),
    ];
  }, [processedOperatingHours, today]);

  return (
    <div className="border-b-8 border-gray-1">
      <StudioTitle name={name} profileImage={`${profileImage}`} />
      <div className="my-4 bg-primary-1 p-4 rounded-lg relative">
        <div className="flex gap-4 text-gray-7">
          <p
            className={`mr-10 ${
              isNoticeExpanded ? "line-clamp-none" : "line-clamp-1"
            } overflow-hidden transition-all`}
          >
            {notice || "공지사항이 없습니다"}
          </p>
        </div>
        {notice.trim() && (
          <button
            onClick={() => setIsNoticeExpanded(!isNoticeExpanded)}
            className="text-gray-5 text-sm absolute right-4 top-5"
          >
            {isNoticeExpanded ? (
              <Image
                src="/icons/studiodetail/arrow_up_gray.svg"
                alt="Dropdown open"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/icons/studiodetail/arrow_dropdown_gray.svg"
                alt="Dropdown open"
                width={16}
                height={16}
              />
            )}
          </button>
        )}
      </div>
      <div className="mt-2 flex flex-col gap-2">
        <p className="text-gray-5">리뷰 {totalReviews}개</p>
        <p className="flex gap-1">
          <Image
            src="/icons/studiodetail/location_on.svg"
            alt={`${name} profile`}
            width={20}
            height={20}
          />
          주소 {address}
        </p>
        <div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between gap-2 cursor-pointer"
          >
            <Image
              src="/icons/studiodetail/clock.svg"
              alt={`${name} profile`}
              width={20}
              height={20}
            />
            <span
              className={`font-bold ${
                isOpen
                  ? "text-blue-500"
                  : isClosed
                    ? "text-red-500"
                    : "text-gray-500"
              }`}
            >
              {isOpen ? "영업중" : isClosed ? "영업 종료" : "휴무"}
            </span>
            <span className="text-blue-500 text-sm ml-2">
              {isDropdownOpen ? (
                <Image
                  src="/icons/studiodetail/arrow_up_blue.svg"
                  alt="Dropdown open"
                  width={16}
                  height={16}
                />
              ) : (
                <Image
                  src="/icons/studiodetail/arrow_dropdown_blue.svg"
                  alt="Dropdown open"
                  width={16}
                  height={16}
                />
              )}
            </span>
          </button>
          {isDropdownOpen && (
            <ul className="bg-white shadow-md rounded-md p-2">
              {sortedOperatingHours.map(
                ({ dayOfWeek, openTime, closeTime }, idx) => (
                  <li key={idx} className="flex gap-4 py-1">
                    <span
                      className={`font-semibold ${
                        idx === 0 ? "text-blue-500" : ""
                      }`}
                    >
                      {dayOfWeek}
                    </span>
                    {openTime === "휴무" ? (
                      <span>휴무</span>
                    ) : openTime === "24시간" ? (
                      <span>24시간 운영</span>
                    ) : (
                      <span>
                        {openTime} - {closeTime}
                      </span>
                    )}
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
export default StudioSummary;
