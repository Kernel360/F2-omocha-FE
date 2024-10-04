import {
  AuctionListResponse,
  BasicAuctionResponse,
  GetBasicAuctionListQueryFnProps,
} from '../types/Auction';

import apiClient from './apiClient';
import convertQueryParamsObjectToString from './convertQueryParamsObjectToString';

export const getBasicAuctionQueryFn = async (id: number) => {
  const response = (await apiClient.get)<BasicAuctionResponse>(`/api/v1/auction/${id}`);

  return (await response).data.result_data;
};

export const getBasicAuctionListQueryFn = async (params: GetBasicAuctionListQueryFnProps) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListQueryFnProps>(params);

  const response = (await apiClient.get)<AuctionListResponse>(
    `/api/v1/auction/basic-list?${queryString}`,
  );

  return (await response).data;
};
