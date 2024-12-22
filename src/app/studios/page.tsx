"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import FilterGroup from "@/features/studios/components/filterGroup";
import StudioList from "@/features/studios/components/studioList";
import { TopBar } from "@/features/common/components/topbar";
import { useConceptStore } from "@/features/common/store/useConceptStore";

const StudiosRoutePage = () => {
  const searchParams = useSearchParams();
  const conceptIdParam = searchParams?.get("conceptId");
  const conceptId =
    conceptIdParam && !isNaN(parseInt(conceptIdParam, 10))
      ? parseInt(conceptIdParam, 10)
      : null;

  const { conceptName } = useConceptStore();

  const [filters, setFilters] = useState<{
    price?: number;
    rating?: number;
    locations: string[];
  }>({
    price: undefined,
    rating: undefined,
    locations: [],
  });

  const handleApplyFilters = (newFilters: {
    price?: string[];
    rating?: string[];
    locations?: string[];
  }) => {
    setFilters({
      price:
        newFilters.price?.length && newFilters.price[0] !== ""
          ? Number(newFilters.price[0])
          : undefined,
      rating:
        newFilters.rating?.length && newFilters.rating[0] !== ""
          ? Number(newFilters.rating[0])
          : undefined,
      locations: newFilters.locations?.includes("")
        ? []
        : newFilters.locations || [],
    });
  };

  if (!conceptId) {
    return (
      <div>
        <TopBar />
        <div className="text-center mt-10 text-red-500">
          conceptId가 유효하지 않습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white pb-4">
      <TopBar
        showShare={false}
        showCart={true}
        message={conceptName || "스튜디오 리스트"}
        location={"/"}
      />
      <FilterGroup
        filters={{
          price: filters.price ? [filters.price.toString()] : [],
          rating: filters.rating ? [filters.rating.toString()] : [],
          locations: filters.locations || [],
        }}
        onApplyFilters={handleApplyFilters}
      />
      <StudioList
        conceptId={conceptId}
        filters={{
          price: filters.price,
          rating: filters.rating,
          locations: filters.locations,
        }}
      />
    </div>
  );
};

export default StudiosRoutePage;
