export type BasicAuctionResponseData = Omit<AuctionData, 'auction_id'> & {
  auction_type: string;
  bid_unit: number;
  content: string;
  now_price: number;
  seller_id: number;
  status: string;
  conclude_price: number | null;
};

//------
export interface AuctionData {
  auction_id: number;
  title: string;
  start_price: number;
  start_date: string;
  end_date: string;
  image_keys: string[];
  bid_count: number;
  now_price: number;
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
  acution_id: number;
}

// -----

export interface GetBasicAuctionListParams {
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

export interface AuctionQNAData {
  question_response: QuestionResponse;
  answer_response: AnswerResponse | null;
}

export interface GetAuctionQnAListDataResponseData {
  content: AuctionQNAData[];
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
  created_at: string;
}
