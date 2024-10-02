import apiClient from './apiClient';

interface BasicAuctionData {
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

interface BasicAuctionResponse {
  result_data: BasicAuctionData;
  result_msg: string;
  status_code: string;
}
export const getBasicAuctionQueryFn = async (id: number) => {
  const response = (await apiClient.get)<BasicAuctionResponse>(`/api/v1/auction/${id}`);

  return (await response).data.result_data;
};
