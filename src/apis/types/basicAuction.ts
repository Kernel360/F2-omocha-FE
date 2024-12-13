import { Category } from './category';

// 단일
export interface BasicAuctionResponseData {
  auction_id: number;
  member_id: number;
  email: string;
  nickname: string;
  title: string;
  content: string;
  start_price: number;
  bid_unit: number;
  instant_buy_price: number | null;
  auction_status: string;
  thumbnail_path: string;
  now_price: number | null;
  bid_count: number;
  like_count: number;
  start_date: string;
  end_date: string;
  created_at: string;
  image_paths: string[];
  category_id: number;
}

// 리스트
export interface AuctionData {
  auction_id: number;
  member_id: number;
  title: string;
  content: string;
  start_price: number;
  bid_unit: number;
  instant_buy_price: number;
  auction_status: string;
  thumbnail_path: string;
  now_price: number | null;
  conclude_price: number | null;
  bid_count: number;
  like_count: number;
  is_liked: boolean;
  start_date: string;
  end_date: string;
  created_at: string;
  category_id: number;
  category_response: Category[];
}

export interface PostBasicAuctionResponseData {
  auction_id: number;
  is_instant_buy: boolean;
}

export interface GetBasicAuctionListParams {
  categoryId?: number | null;
  title?: string;
  auctionStatus?: string;
  direction?: string;
  sort?: string;
  page?: number;
  size?: number;
}

// ---- 입찰

export interface GetBasicAuctionBidInfo {
  buyer_member_id: number;
  bid_price: number;
  created_at: string;
  buyer_email: string;
  buyer_nickname: string;
}

export interface PostBasicAuctionBidParams {
  bid_price: number;
}

export interface PostBasicAuctionBidResponseData {
  buyer_id: number;
  bid_price: number;
  created_at: string;
}

// ----- QnA

export interface QuestionResponse {
  question_id: number;
  title: string;
  content: string;
  created_at: string; // ISO 날짜 형식
  member_id: number;
  email: string | null;
  nick_name: string | null;
  profile_image_url: string | null;
}

export interface AnswerResponse {
  answer_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface AuctionQnAData {
  question_details: QuestionResponse;
  answer_details: AnswerResponse | null;
}

export interface PostAuctionQnAParams {
  title: string;
  content: string;
  auction_id: number;
}

export interface PostAuctionQnAResponseData {
  question_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface PostAuctionQnAAnswerParams {
  question_id: number;
  title: string;
  content: string;
}

export interface PostAuctionQnAAnswerResponseData {
  question_id: number;
  title: string;
  content: string;
  created_at: string;
}

// ---- 현재가

export interface GetNowPriceResponseData {
  now_price: number;
  called_at: string;
  created_at: string;
}

// --- 찜
export interface PostLikeParams {
  auction_id: number;
}

export interface PostLikeResponseData {
  auction_id: number;
  member_id: number;
  like_type: 'LIKE' | 'UNLIKE';
}
