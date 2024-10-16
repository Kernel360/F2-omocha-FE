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

export interface AuctionQNAListData {
  question_id: number;
  question_member_id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GetAuctionQnAListDataResponseData {
  content: AuctionQNAListData[];
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
