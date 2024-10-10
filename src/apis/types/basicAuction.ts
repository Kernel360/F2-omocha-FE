export type BasicAuctionResponseData = Omit<AuctionData, 'auction_id'> & {
  auction_type: string;
  bid_unit: number;
  content: string;
  now_price: number;
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
export interface PostBasicAuctionParams {
  title: string;
  content: string;
  start_price: number;
  auction_type: 'BASIC' | 'LIVE';
  start_date: string;
  end_date: string;
  images: string[];
}

// -----
export interface GetBasicAuctionListParams {
  title?: string;
  sort?: string;
  auctionStatus?: string;
  direction?: string;
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
