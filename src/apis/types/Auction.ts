export interface BasicAuctionData {
  title: string;
  auction_type: string;
  bid_unit: number;
  content: string;
  end_date: string;
  start_date: string;
  image_keys: string[];
  start_price: number;
  now_price: number;
}

export interface BasicAuctionResponse {
  result_data: BasicAuctionData;
  result_msg: string;
  status_code: string;
}

export interface Auction {
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

export interface AuctionResponse {
  content: Auction[];
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
  result_data: AuctionResponse;
}

export interface GetBasicAuctionListQueryFnProps {
  title?: string;
  sort?: string;
  page?: number;
  size?: number;
}
