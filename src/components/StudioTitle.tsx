/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";

interface StudioTitleProps {
  name: string;
  profileImage: string;
  size?: "sm" | "md" | "lg";
  createDate?: string;
}

const DEFAULT_IMAGE = "/default/sample.png";

const StudioTitle: React.FC<StudioTitleProps> = ({
  name,
  profileImage,
  size = "md",
  createDate, // 예약 날짜 prop 추가
}) => {
  const [imageSrc, setImageSrc] = useState(profileImage || DEFAULT_IMAGE);

  const sizeClasses = {
    sm: "h-8 w-8 text-sm",
    md: "h-12 w-12 text-base",
    lg: "h-16 w-16 text-lg",
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className={`relative overflow-hidden rounded-full border border-gray-1 flex items-center ${sizeClasses[size]}`}
      >
        <Image
          src={imageSrc}
          alt={`${name} profile`}
          width={64}
          height={64}
          priority
          className="object-cover"
        />
        <img
          src={imageSrc}
          alt="터치즈"
          className="hidden"
          onError={() => setImageSrc(DEFAULT_IMAGE)}
        />
      </div>

      <div>
        <h2 className="text-gray-800 font-semibold">{name}</h2>

        {/* 예약 날짜가 있을 경우만 표시 */}
        {createDate && (
          <p className="text-gray-500 font-medium flex gap-1 items-center">
            <Image
              src="/icons/event.svg"
              alt="calendar"
              width={20}
              height={20}
              className="object-cover"
            />
            {createDate}
          </p>
        )}
      </div>
    </div>
  );
};

export default StudioTitle;
