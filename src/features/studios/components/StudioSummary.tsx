"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { formatContent } from "@/utils/formatContent";

function StudioSummary({
  profileImage,
  name,
  totalReviews,
  description,
  address,
  operatingHours,
  notice,
}: {
  profileImage: string;
  name: string;
  totalReviews: number;
  description: string;
  address: string;
  operatingHours: { dayOfWeek: string; openTime: string; closeTime: string }[];
  notice: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isNoticeExpanded, setIsNoticeExpanded] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const todayIndex = new Date().getDay();
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const today = daysOfWeek[todayIndex];

  const todayOperatingHours = operatingHours.find(
    (item) => item.dayOfWeek === today
  );

  const isOpen = useMemo(() => {
    if (!todayOperatingHours || todayOperatingHours.openTime === "휴무") {
      return false; // 휴무
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
    const todayIndexInData = operatingHours.findIndex(
      (item) => item.dayOfWeek === today
    );
    if (todayIndexInData === -1) return operatingHours;

    return [
      ...operatingHours.slice(todayIndexInData),
      ...operatingHours.slice(0, todayIndexInData),
    ];
  }, [operatingHours, today]);

  const formattedContent = formatContent(description);
  const visibleContent = isExpanded
    ? formattedContent
    : formattedContent.slice(0, 1);

  return (
    <div className="border-b-8 border-gray-1">
      <div className="flex items-center gap-4 my-4">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <Image
            src={profileImage}
            alt={`${name} profile`}
            width={48}
            height={48}
          />
        </div>
        <h2 className="text-lg font-bold">{name}</h2>
      </div>
      <div className="relative mt-2 flex bg-primary-1 py-2 px-6  rounded-lg">
        <div>
          {visibleContent.map((paragraph, idx) => (
            <p
              key={idx}
              className={`leading-relaxed transition-all duration-300 mr-4 ${
                isExpanded ? "line-clamp-none" : "line-clamp-1"
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {formattedContent.length > 1 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary-5 text-sm font-semibold absolute right-2 top-3"
          >
            {isExpanded ? (
              <Image
                src="/icons/studiodetail/arrow_up_yellow.svg"
                alt="Dropdown open"
                width={16}
                height={16}
              />
            ) : (
              <Image
                src="/icons/studiodetail/arrow_dropdown_yellow.svg"
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
                  <li key={idx} className="flex gap-4 py-1 px-">
                    <span
                      className={`font-semibold ${
                        idx === 0 ? "text-blue-500" : ""
                      }`}
                    >
                      ({dayOfWeek})
                    </span>
                    {openTime === "휴무" ? (
                      <span>휴무</span>
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
      <div className="my-4 bg-gray-1 p-4 rounded-lg relative">
        <div className="flex gap-4 text-lg text-gray-7">
          <Image
            src="/icons/studiodetail/volume.svg"
            alt={`${name} profile`}
            width={20}
            height={20}
          />
          <p
            className={`mr-10 ${
              isNoticeExpanded ? "line-clamp-none" : "line-clamp-1"
            } overflow-hidden transition-all`}
          >
            {notice}
          </p>
        </div>
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
      </div>
    </div>
  );
}
export default StudioSummary;
