"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useStudioList } from "../hooks/useStudiosList";
import { useFilters } from "@/features/studios/hooks/useFilters";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import CommonPagination from "@/features/common/components/pagination";
import StudioTitle from "@/components/StudioTitle";
import { SkeletonLoader } from "@/features/common/components/SkeletonLoader";

const StudioList = ({
  conceptId,
  filters,
}: {
  conceptId: number;
  filters: { price?: number; rating?: number; locations?: string[] };
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const {
    data: allStudiosData,
    loading: allStudiosLoading,
    error: allStudiosError,
    refetch: refetchAllStudios,
  } = useStudioList(conceptId, currentPage);

  const {
    data: filteredStudiosData,
    loading: filteredStudiosLoading,
    error: filteredStudiosError,
    refetch: refetchFilteredStudios,
  } = useFilters(conceptId, filters, currentPage);

  const isFilterApplied = useMemo(
    () =>
      filters.price !== undefined ||
      filters.rating !== undefined ||
      (filters.locations && filters.locations.length > 0),
    [filters]
  );

  useEffect(() => {
    if (isFilterApplied) {
      setTotalPages(filteredStudiosData?.totalPages ?? 1);
    } else {
      setTotalPages(allStudiosData?.totalPages ?? 1);
    }
  }, [isFilterApplied, filteredStudiosData, allStudiosData]);

  const isLoading = isFilterApplied
    ? filteredStudiosLoading
    : allStudiosLoading;
  const isError = isFilterApplied ? filteredStudiosError : allStudiosError;

  const refetch = (page: number) => {
    if (isFilterApplied) {
      refetchFilteredStudios(page);
    } else {
      refetchAllStudios(page);
    }
  };

  const studios = isFilterApplied
    ? filteredStudiosData?.content || []
    : allStudiosData?.content || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage - 1);
    refetch(newPage - 1);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isLoading ? (
        <SkeletonLoader itemCount={5} showImage={true} showText={true} />
      ) : isError ? (
        <p>오류 발생: 데이터를 불러오지 못했습니다.</p>
      ) : studios.length > 0 ? (
        <>
          {studios.map((studio) => (
            <Link href={`/studios/${studio.id}`} key={studio.id}>
              <div className="flex flex-col gap-4 border-b-8 py-4 border-gray-1 transition-all duration-300">
                <StudioTitle
                  name={studio.name}
                  profileImage={studio.profileImage}
                />
                <div className="flex items-center gap-4 font-medium">
                  <div className="flex items-center px-2 py-1 bg-gray-1 rounded-lg border">
                    <Image
                      src="/icons/studio/star.svg"
                      alt={`${studio.name}의 평점 ${studio.rating}`}
                      width={24}
                      height={24}
                      style={{
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                    <span>{studio.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-gray-1 rounded-lg border">
                    <Image
                      src="/icons/studio/credit_card.svg"
                      alt={`${studio.name}의 가격 ${studio.price.toLocaleString()}원`}
                      width={24}
                      height={24}
                      style={{
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                      }}
                    />
                    <span>{studio.price.toLocaleString()}원</span>
                  </div>
                </div>
                <div className="w-full max-w-[600px] overflow-hidden">
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    grabCursor={true}
                    freeMode={true}
                    modules={[Navigation, Pagination, FreeMode]}
                  >
                    {studio.imageUrls.map((image: string, idx: number) => (
                      <SwiperSlide
                        key={idx}
                        className="relative aspect-3/4 overflow-hidden max-w-40 rounded-lg border-gray-2 border"
                      >
                        <Image
                          src={image}
                          alt={`${studio.name} image ${idx + 1}`}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </Link>
          ))}

          <CommonPagination
            currentPage={currentPage + 1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p>필터링된 스튜디오가 없습니다.</p>
      )}
    </>
  );
};

export default StudioList;
