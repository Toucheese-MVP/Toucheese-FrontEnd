export interface ReservatedList {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Reservation[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface Reservation {
  reservationId: number;
  studioId: number;
  studioName: string;
  studioImage: string;
  productName: string;
  createDate: string;
  createTime: string;
  status: string;
  productId: number;
}

// interface Time {
//   hour: number;
//   minute: number;
//   second: number;
//   nano: number;
// }

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Pageable {
  offset: number;
  sort: Sort;
  unpaged: boolean;
  paged: boolean;
  pageNumber: number;
  pageSize: number;
}
