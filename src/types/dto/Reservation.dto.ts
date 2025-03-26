export interface ReservatedListDTO {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ReservationDTO[];
  number: number;
  sort: Sort;
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ReservationDTO {
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
