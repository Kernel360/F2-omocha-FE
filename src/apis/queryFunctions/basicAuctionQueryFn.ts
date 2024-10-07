import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

import {
  AuctionListResponse,
  BasicAuctionResponse,
  GetBasicAuctionListParams,
} from '../types/Auction';

import apiClient from './apiClient';

export const getBasicAuction = async (id: number) => {
  const response = await apiClient.get<BasicAuctionResponse>(`/v1/auction/${id}`);

  return response.data;
};

export const getBasicAuctionList = async (params: GetBasicAuctionListParams) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListParams>(params);

  const response = await apiClient.get<AuctionListResponse>(
    `/v1/auction/basic-list?${queryString}`,
  );

  return response.data;
};
