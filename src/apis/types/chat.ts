export interface GetChatroomListParams {
  pageable: number;
}

export interface ChatroomData {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_id: number;
  seller_name: string | null;
  now_price: number;
  buyer_id: number;
  buyer_name: string | null;
  created_date: string; // ISO 날짜 형식으로 관리
}

export interface Sort {
  orders: string[]; // `any`는 적절한 타입으로 수정 가능
}

export interface ChatroomListResponseData {
  content: ChatroomData[];
  sort: Sort;
  current_page: number;
  size: number;
  first: boolean;
  last: boolean;
  has_next: boolean;
}
