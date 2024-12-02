export interface PostReview {
  review_type: string;
  rating: number;
  content: string;
}

export interface PostReviewResponseData {
  review_id: number;
}

export interface ReceivedReview {
  recipient_member_id: number;
  recipient_member_nickname: string;
  auction_id: number;
  auction_title: string;
  thumbnail_path: string;
  review_type: string;
  rating: number;
  content: string;
  create_at: string;
}
export interface GetReviewsResponseData {
  content: ReceivedReview[];
}
