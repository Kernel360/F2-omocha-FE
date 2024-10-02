import { GetBasicAuctionListQueryFnProps } from '../queryHooks/basicAuction/useGetBasicAuctionList';
import { AuctionListResponse, BasicAuctionResponse } from '../types/Auction';

import apiClient from './apiClient';
// import convertQueryParamsObjectToString from './convertQueryParamsObjectToString';

export const getBasicAuctionQueryFn = async (id: number) => {
  const response = (await apiClient.get)<BasicAuctionResponse>(`/api/v1/auction/${id}`);

  return (await response).data.result_data;
};

export const getBasicAuctionListQueryFn = async (params?: GetBasicAuctionListQueryFnProps) => {
  console.log('searchKeyword in fn', params);

  // const queryString = convertQueryParamsObjectToString<GetBasicAuctionListQueryFnProps>(params);

  const response = (await apiClient.get)<AuctionListResponse>(
    // `/api/v1/auction/basic-list?${queryString}`,
    `/api/v1/auction/basic-list`,
  );

  return (await response).data;
};
