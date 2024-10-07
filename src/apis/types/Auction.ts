export type BasicAuctionResponseData = Omit<AuctionData, 'auction_id'> & {
  auction_type: string;
  bid_unit: number;
  content: string;
  now_price: number;
};

export interface BasicAuctionResponse {
  result_data: BasicAuctionResponseData;
  result_msg: string;
  status_code: string;
}

//------
export interface AuctionData {
  auction_id: number;
  title: string;
  start_price: number;
  start_date: string;
  end_date: string;
  image_keys: string[];
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
export interface AuctionListResponse {
  status_code: number;
  result_msg: string;
  result_data: AuctionListResponseData;
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
  page?: number;
  size?: number;
}
