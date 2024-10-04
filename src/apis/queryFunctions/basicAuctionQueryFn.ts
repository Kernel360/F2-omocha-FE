import {
  AuctionListResponse,
  BasicAuctionResponse,
  GetBasicAuctionListQueryFnProps,
} from '../types/Auction';

import apiClient from './apiClient';
import convertQueryParamsObjectToString from './convertQueryParamsObjectToString';

export const getBasicAuctionQueryFn = async (id: number): Promise<BasicAuctionResponse> => {
  const response = (await apiClient.get)(`/api/v1/auction/${id}`);

  return (await response).data.result_data;
};

export const getBasicAuctionListQueryFn = async (
  params: GetBasicAuctionListQueryFnProps,
): Promise<AuctionListResponse> => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListQueryFnProps>(params);

  const response = await apiClient.get(`/api/v1/auction/basic-list?${queryString}`);

  return (await response).data;
};
