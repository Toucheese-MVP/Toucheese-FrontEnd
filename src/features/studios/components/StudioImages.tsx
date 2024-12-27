"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export function StudioImages({
  facilityImageUrls,
}: {
  facilityImageUrls: string[];
}) {
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
        {facilityImageUrls.map((image, idx) => (
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
