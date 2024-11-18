import { Pageable } from './basicAuction';

export interface UserResponseData {
  member_id: number;
  email: string;
  user_name: null | string;
  nick_name: null | string;
  phone_number: null | string;
  birth: null | string;
  role: 'ROLE_USER';
  profile_image_url: null | string;
}

export interface PatchProfileImageResponseData {
  image_url: string;
}

export interface PatchPasswordParams {
  current_password: string;
  new_password: string;
}

export interface BidAuctionHistoriesData {
  auction_id: number;
  title: string;
  auction_status: string;
  thumbnail_path: string;
  bid_status: string;
}

export interface BidAuctionHistoriesDataResponseData {
  content: BidAuctionHistoriesData[];
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

export interface BidAuctionHistoriesUnitData {
  bid_price: number;
  created_at: string;
}
export interface BidAuctionHistoriesUnitDataResponseData {
  content: BidAuctionHistoriesUnitData[];
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

export interface AuctionHistoriesData {
  auction_id: number;
  title: string;
  auction_status: string;
  now_price: number | null;
  end_date: string;
  thumbnail_path: string;
}
export interface AuctionHistoriesDataResponseData {
  content: AuctionHistoriesData[];
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
