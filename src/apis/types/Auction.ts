// auction 타입 관련된거 짱박아.
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
