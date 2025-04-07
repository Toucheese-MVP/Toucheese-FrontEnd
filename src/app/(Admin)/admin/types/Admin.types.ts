// 선택 옵션에 대한 인터페이스
export interface SelectAddOption {
  selectOptionId: number;
  selectOptionName: string;
  selectOptionPrice: number;
}

// 예약 정보에 대한 인터페이스
export interface Reservation {
  reservationId: number;
  customerName: string;
  customerPhone: string;
  studioName: string;
  status: string; // 예약 상태 (예: 예약접수, 완료 등)
  createDate: string; // 날짜 형식 (ISO 8601)
  personnel: number; // 인원 수
  totalPrice: number; // 총 가격
  productName: string; // 상품명
  productPrice: number; // 상품 가격
  selectAddOptions: SelectAddOption[]; // 선택 옵션 배열
  createTime: string;
}

// 페이징 관련 정렬 정보 인터페이스
export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이징 관련 정보 인터페이스
export interface Pageable {
  offset: number;
  sort: Sort;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
}

// 최상위 페이징 데이터 인터페이스
export interface ReservationResponse {
  totalPages: number; // 전체 페이지 수
  totalElements: number; // 전체 데이터 수
  size: number; // 현재 페이지 크기
  content: Reservation[]; // 예약 데이터 배열
  number: number; // 현재 페이지 번호
  sort: Sort; // 현재 페이지 정렬 정보
  numberOfElements: number; // 현재 페이지의 데이터 개수
  pageable: Pageable; // 페이징 정보
  first: boolean; // 첫 번째 페이지 여부
  last: boolean; // 마지막 페이지 여부
  empty: boolean; // 데이터가 비어있는지 여부
}
