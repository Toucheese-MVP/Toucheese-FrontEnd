"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const DEFAULT_IMAGE_URL = "/default-facility.png"; // 기본 이미지 URL (public 폴더 안에 위치)

export function StudioImages({
  facilityImageUrls,
}: {
  facilityImageUrls: string[];
}) {
  const imagesToShow =
    facilityImageUrls.length > 0 ? facilityImageUrls : [DEFAULT_IMAGE_URL];

  return (
    <div className="relative h-[300px] -mx-4">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        grabCursor={true}
        pagination={{
          type: "fraction",
        }}
        modules={[Pagination]}
        className="w-full h-full"
      >
        {imagesToShow.map((image, idx) => (
          <SwiperSlide key={idx} className="h-full">
            <div className="relative w-full h-full ">
              <Image
                src={image}
                alt={`Facility image ${idx + 1}`}
                className="object-cover shadow-xl"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
