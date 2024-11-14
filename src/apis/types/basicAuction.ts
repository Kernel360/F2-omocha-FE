import { Category } from './category';

export type BasicAuctionResponseData = {
  auction_id: number;
  member_id: number;
  title: string;
  content: string;
  start_price: number;
  bid_unit: number;
  auction_status: string;
  thumbnail_path: string;
  now_price: number | null;
  bid_count: number;
  start_date: string;
  end_date: string;
  created_at: string;
  image_paths: string[];
  categories: Category[];
};

//------
export interface AuctionData {
  auction_id: number;
  member_id: number;
  title: string;
  content: string;
  start_price: number;
  bid_unit: number;
  auction_status: string;
  thumbnail_path: string;
  now_price: number | null;
  conclude_price: number | null;
  bid_count: number;
  start_date: string;
  end_date: string;
  created_at: string;
  category_response: Category[];
}

export interface Pageable {
  page_number: number;
  page_size: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface AuctionListResponseData {
  content: AuctionData[];
  pageable: Pageable;
  total_pages: number;
  total_elements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  number_of_elements: number;
  first: boolean;
  empty: boolean;
}

//------
export interface PostBasicAuctionResponseData {
  auction_id: number;
}

// -----

export interface GetBasicAuctionListParams {
  categoryId?: number | null;
  title?: string;
  auctionStatus?: string;
  direction?: string;
  sort?: string;
  page?: number;
  size?: number;
}

// ----

export interface GetBasicAuctionBidInfo {
  buyer_id: number;
  bid_price: number;
  created_at: string;
}

// -----
export interface PostBasicAuctionBidParams {
  bid_price: number;
}

export interface PostBasicAuctionBidResponseData {
  buyer_id: number;
  bid_price: number;
  created_at: string;
}

// -----

export interface QuestionResponse {
  question_id: number;
  title: string;
  content: string;
  created_at: string; // ISO 날짜 형식
  member_id: number;
  email: string | null;
}

export interface AnswerResponse {
  answer_id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface AuctionQnAData {
  question_response: QuestionResponse;
  answer_response: AnswerResponse | null;
}

export interface GetAuctionQnAListDataResponseData {
  content: AuctionQnAData[];
  pageable: Pageable;
  total_pages: number;
  total_elements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  number_of_elements: number;
  first: boolean;
  empty: boolean;
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

export interface GetNowPriceResponseData {
  now_price: number;
  called_at: string;
  created_at: string;
}
