export interface UserResponseData {
  member_id: number;
  email: string;
  user_name: string | null;
  nick_name: string | null;
  phone_number: string | null;
  birth: string | null;
  profile_image_url: string | null;
  login_type: 'general' | 'naver' | 'google';
  like_count: number;
}

export interface PatchProfileImageResponseData {
  image_url: string;
}

export interface PatchPasswordParams {
  current_password: string;
  new_password: string;
}

// ---- 찜 목록
export interface GetAuctionLikeData {
  auction_id: number;
  title: string;
  thumbnail_path: string;
  start_price: number;
  now_price: number | null;
  auction_status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  liked_date: string;
}
