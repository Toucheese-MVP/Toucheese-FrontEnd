import { Product } from "./Product.type";

export interface StudioDetail {
  id: number;
  name: string;
  profileImage: string;
  description?: string;
  rating: number;
  reviewCount: number;
  operationHour: string;
  address: string;
  notice: string;
  facilityImageUrls: string[]; // 단일 문자열 배열로 수정
  products: Product[]; // Product 타입 사용
  operatingHours: { dayOfWeek: string; openTime: string; closeTime: string }[];
}
