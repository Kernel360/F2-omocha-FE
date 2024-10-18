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
  last_message_time: string; // ISO 날짜 형식으로 관리
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

// ----

export interface OpenAuctionInfo {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_id: number;
  seller_name: string | null;
  now_price: number;
  buyer_id: number;
  buyer_name: string | null;
}

//----
export interface ChatRoomInfo {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_id: number;
  seller_name: string | null;
  conclude_price: number;
  buyer_id: number;
  buyer_name: string | null;
  created_date: string;
  last_message_time: string | null;
}

export interface ChatMessage {
  type: string;
  room_id: number;
  sender_nick_name: string | null;
  sender_id: number;
  message: string;
  created_date: string;
}

export interface Messages {
  content: ChatMessage[];
  sort: Sort;
  current_page: number;
  size: number;
  first: boolean;
  last: boolean;
  has_next: boolean;
}

export interface GetLastChatResponseData {
  chat_room_info: ChatRoomInfo;
  messages: Messages;
}
