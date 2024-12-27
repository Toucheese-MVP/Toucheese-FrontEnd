"use client";

import useStudioStore from "@/features/studios/store/StudioStore";

export function StudioTabs() {
  const { activeTab, setActiveTab } = useStudioStore();
  const tabs = ["가격", "리뷰"];

  return (
    <div className="flex border-b -mx-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 text-center py-2 mx-4 outline-none rounded-t-2xl font-semibold transition-all ${
            activeTab === tab
              ? "border-b-4 border-primary-5"
              : "border-b-4 border-transparent"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
