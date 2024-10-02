import { AuctionListResponse, BasicAuctionResponse } from '../types/Auction';

import apiClient from './apiClient';

export const getBasicAuctionQueryFn = async (id: number) => {
  const response = (await apiClient.get)<BasicAuctionResponse>(`/api/v1/auction/${id}`);

  return (await response).data.result_data;
};

export const getBasicAuctionListQueryFn = async () => {
  const response = (await apiClient.get)<AuctionListResponse>('/api/v1/auction/basic-list');

  return (await response).data;
};
