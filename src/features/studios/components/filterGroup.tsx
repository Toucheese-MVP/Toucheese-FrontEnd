"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { SelectedFilters } from "@/features/studios/types/filters.type";
import { filterConfigs } from "@/api/constants/filterConfigs";

const FilterGroup = ({
  filters,
  onApplyFilters,
}: {
  filters: SelectedFilters;
  onApplyFilters: (newFilters: SelectedFilters) => void;
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [tempFilters, setTempFilters] = useState<SelectedFilters>(filters);

  useEffect(() => {
    setTempFilters(filters);
  }, [filters]);

  const updateTempFilter = (key: keyof SelectedFilters, value: string) => {
    const newFilters = {
      ...tempFilters,
      [key]:
        key === "locations"
          ? value === "전체"
            ? []
            : tempFilters[key]?.includes(value)
              ? tempFilters[key].filter((v) => v !== value)
              : [...(tempFilters[key] || []), value]
          : value === "전체"
            ? []
            : [value],
    };

    setTempFilters(newFilters);
  };

  const toggleDropdown = (key: string) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const handleApply = () => {
    onApplyFilters(tempFilters);
    setActiveDropdown(null);
  };

  const handleReset = () => {
    const resetFilters: SelectedFilters = {
      locations: [],
      rating: [],
      price: [],
    };
    setTempFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const handleCloseBottomSheet = () => {
    setActiveDropdown(null);
  };

  const getFilterChipLabel = (key: string) => {
    const config = filterConfigs.find((config) => config.key === key);
    const selectedValues = tempFilters[key as keyof SelectedFilters];

    if (selectedValues && selectedValues.length > 0) {
      const firstLabel = config?.options.find(
        (option) => option.value === selectedValues[0]
      )?.label;
      const additionalCount = selectedValues.length - 1;
      return additionalCount > 0
        ? `${firstLabel} 외 ${additionalCount}`
        : firstLabel;
    }

    return config?.label || "";
  };

  return (
    <div className="flex gap-4 mb-4 relative">
      <button
        className="p-2 rounded-full aspect-square bg-gray-1 text-gray-8 border border-gray-2"
        onClick={handleReset}
      >
        <Image
          src="/icons/close.svg"
          alt="필터초기화버튼"
          width={20}
          height={20}
          style={{
            width: "auto",
            height: "auto",
            objectFit: "contain",
          }}
        />
      </button>

      {filterConfigs.map((config) => (
        <div key={config.key}>
          <button
            className="px-4 py-2 rounded-full bg-gray-1 text-gray-8 flex items-center gap-1  border border-gray-2"
            onClick={() => toggleDropdown(config.key)}
          >
            {getFilterChipLabel(config.key)}
            <Image
              src="/icons/keyboard_arrow_down.svg"
              alt="필터메뉴버튼"
              width={20}
              height={20}
              style={{
                width: "auto",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </button>
        </div>
      ))}

      {activeDropdown && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center">
          <div className="w-full bg-white rounded-t-2xl shadow-lg pb-10 p-4 max-h-[70%] max-w-custom overflow-y-auto md:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {filterConfigs.find((config) => config.key === activeDropdown)
                  ?.label || ""}
              </h2>
              <button
                onClick={handleCloseBottomSheet}
                className="text-gray-500"
              >
                <Image
                  src="/icons/close.svg"
                  alt="필터메뉴닫기"
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              {filterConfigs.map((config) => (
                <div key={config.key} className="border-b p-4 -mx-4">
                  <h3 className="text-lg font-medium mb-2">{config.label}</h3>
                  <ul className="flex flex-wrap gap-4">
                    {config.options.map((option) => (
                      <li key={option.value} className="min-w-24">
                        {config.key === "locations" ? (
                          <label className="flex items-center gap-2 ">
                            <input
                              type="checkbox"
                              className="custom-checkbox"
                              value={option.value}
                              checked={tempFilters[config.key]?.includes(
                                option.value
                              )}
                              onChange={() =>
                                updateTempFilter(config.key, option.value)
                              }
                            />
                            {option.label}
                          </label>
                        ) : config.key === "rating" ||
                          config.key === "price" ? (
                          <label className="flex items-center gap-2 custom-radio">
                            <input
                              type="radio"
                              name={config.key}
                              value={option.value}
                              checked={
                                tempFilters[config.key]?.[0] === option.value
                              }
                              onChange={() =>
                                updateTempFilter(config.key, option.value)
                              }
                            />
                            <span className="radio-indicator"></span>
                            {option.label}
                          </label>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>

            <div className="flex mt-4 gap-2">
              <button
                className="px-6 py-2 bg-gray-2 rounded"
                onClick={handleReset}
              >
                초기화
              </button>
              <button
                className="px-6 py-2 bg-primary-5 font-bold rounded-lg flex-1"
                onClick={handleApply}
              >
                적용하기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterGroup;
