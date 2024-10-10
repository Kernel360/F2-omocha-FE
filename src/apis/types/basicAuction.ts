import { CommonResponse } from './common';

export type BasicAuctionResponseData = Omit<AuctionData, 'auction_id'> & {
  auction_type: string;
  bid_unit: number;
  content: string;
  now_price: number;
};

export interface BasicAuctionResponse extends CommonResponse {
  result_data: BasicAuctionResponseData;
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

export interface AuctionListResponse extends CommonResponse {
  result_data: AuctionListResponseData;
}
//------

interface PostBasicAuctionResponseData {
  acution_id: number;
}

export interface PostBasicAuctionResponse extends CommonResponse {
  result_data: PostBasicAuctionResponseData;
}

// -----

type AunctionStatusType = 'PREBID' | 'BIDDING' | 'CONCLUDED' | 'COMPLETED';
export interface GetBasicAuctionListParams {
  title?: string;
  aunctionStatus?: AunctionStatusType;
  sort?: string;
  direction?: string;
  page?: number;
  size?: number;
}
