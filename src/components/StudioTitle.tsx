/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Image from "next/image";

interface StudioTitleProps {
  name: string;
  profileImage: string;
  size?: "sm" | "md" | "lg";
}

const DEFAULT_IMAGE = "/default/sample.png";

const StudioTitle: React.FC<StudioTitleProps> = ({
  name,
  profileImage,
  size = "md",
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
          className="object-contain"
          onError={() => setImageSrc(DEFAULT_IMAGE)}
        />
      </div>
      <h2 className="text-gray-800 font-semibold">{name}</h2>
    </div>
  );
};

export default StudioTitle;
