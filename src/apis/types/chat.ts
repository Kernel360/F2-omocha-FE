export interface GetChatroomListParams {
  pageable: number;
}

export interface ChatroomData {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_member_id: number;
  seller_name: string | null;
  seller_profile_image: string | null;
  thumbnail_path: string;
  conclude_price: number;
  buyer_member_id: number;
  buyer_profile_image: string | null;
  buyer_name: string | null;
  created_date: string; // ISO 날짜 형식으로 관리
  last_message_time: string | null; // ISO 날짜 형식으로 관리
  last_message: string | null;
}

export interface Sort {
  orders: string[];
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
  conclude_price: number;
  buyer_id: number;
  buyer_name: string | null;
  thumbnail_path: string;
}

//----
export interface SocketChatType {
  message_type: string;
  sender_member_id: number;
  message: string;
}

export interface Message {
  message_type: string;
  sender_member_id: number;
  room_id: number;
  nickname: string | null;
  sender_profile_image: string | null;
  message: string;
  created_at: string;
}

export interface GetLastChatResponseData {
  content: Message[];
  sort: Sort;
  current_page: number;
  size: number;
  first: boolean;
  last: boolean;
  has_next: boolean;
}
