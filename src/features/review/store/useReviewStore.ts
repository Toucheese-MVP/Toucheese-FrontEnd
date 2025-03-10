import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type ReviewData = {
  reservationId: number;
  studioId: number;
  studioName: string;
  studioImage: string;
  productName: string;
  createDate: string;
  createTime: string;
  productId: number;
};

type ReviewStore = {
  reviewData: ReviewData | null;
  setReviewData: (data: ReviewData) => void;
};

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set) => ({
      reviewData: null,
      setReviewData: (data) => set({ reviewData: data }),
    }),
    {
      name: "review-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
