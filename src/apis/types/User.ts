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
  auction_status: string; // AUCTION_STATUS 타입 정의 필요
  thumbnail_path: string;
  my_status: string; // 'CONCLUDED' | 'FAIL'; // 여기서 추가적으로 내가 해당 경매와 어떤 상태인지를 알 수 있는 즉 리뷰를 남길 수 있는 상태인지를 줄 수 잇는 요소가 필요
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
