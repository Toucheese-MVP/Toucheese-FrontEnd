"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useStudioList } from "../hooks/useStudiosList";
import { useFilters } from "@/features/studios/hooks/useFilters";
import { useEffect, useState } from "react";
import Link from "next/link";
import CommonPagination from "@/features/common/components/pagination";

const StudioList = ({
  conceptId,
  filters,
}: {
  conceptId: number;
  filters: { price?: number; rating?: number; locations?: string[] };
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

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

  const isFilterApplied =
    filters.price !== undefined ||
    filters.rating !== undefined ||
    (filters.locations && filters.locations.length > 0);

  useEffect(() => {
    const data = isFilterApplied ? filteredStudiosData : allStudiosData;
    if (data) {
      setTotalPages(data.totalPages || 1);
    }
  }, [isFilterApplied, filteredStudiosData, allStudiosData]);

  const refetch = (page: number) => {
    if (isFilterApplied) {
      refetchFilteredStudios(page);
    } else {
      refetchAllStudios(page);
    }
  };

  if (isFilterApplied && filteredStudiosLoading)
    return <p>로딩 중 (필터 적용)...</p>;
  if (!isFilterApplied && allStudiosLoading)
    return <p>로딩 중 (전체 조회)...</p>;

  if (isFilterApplied && filteredStudiosError)
    return <p>오류 발생: 필터된 데이터를 불러오지 못했습니다.</p>;
  if (!isFilterApplied && allStudiosError)
    return <p>오류 발생: 전체 데이터를 불러오지 못했습니다.</p>;

  const studios = isFilterApplied
    ? filteredStudiosData?.content || []
    : allStudiosData?.content || [];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage - 1);
    refetch(newPage - 1);
  };

  return (
    <>
      {studios.length > 0 ? (
        <>
          {studios.map((studio) => (
            <Link href={`/studios/${studio.id}`} key={studio.id}>
              <div className="flex flex-col gap-4 border-b-8 py-4 border-gray-1 transition-all duration-300">
                <div className="flex items-center gap-4">
                  <div className="max-h-12 max-w-12 overflow-hidden rounded-full flex items-center">
                    <Image
                      src={studio.profileImage}
                      alt={`${studio.name} profile`}
                      width={64}
                      height={64}
                      priority
                    />
                  </div>
                  <div>
                    <h2 className="text-gray-8 text-lg font-semibold">
                      {studio.name}
                    </h2>
                  </div>
                </div>
                <div className="flex items-center gap-4 font-medium">
                  <div className="flex items-center px-2 py-1 bg-gray-1 rounded-lg border">
                    <Image
                      src="/icons/studio/star.svg"
                      alt={`${studio.name}의 평점${studio.rating}`}
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
                      alt={`${studio.name}의 평점${studio.rating}`}
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
            currentPage={currentPage + 1} // 페이지 인덱스는 0부터 시작하므로 +1
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
