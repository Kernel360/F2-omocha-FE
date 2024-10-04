export interface PostBasicAuctionParams {
  title: string;
  content: string;
  start_price: number;
  auction_type: 'BASIC' | 'LIVE';
  start_date: string;
  end_date: string;
  images: string[];
}
