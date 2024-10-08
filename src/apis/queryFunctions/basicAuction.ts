import apiClient from '@/apis/queryFunctions/apiClient';
import {
  PostBasicAuctionParams,
  AuctionListResponseData,
  GetBasicAuctionListParams,
  BasicAuctionResponseData,
} from '@/apis/types/basicAuction';
import { Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

export const postBasicAuction = async (param: PostBasicAuctionParams) => {
  const response = await apiClient.post<Response<BasicAuctionResponseData>>('/v1/auction', param);

  return response.data;
};

export const getBasicAuction = async (id: number) => {
  const response = await apiClient.get<Response<BasicAuctionResponseData>>(`/v1/auction/${id}`);

  return response.data;
};

export const getBasicAuctionList = async (params: GetBasicAuctionListParams) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListParams>(params);

  const response = await apiClient.get<Response<AuctionListResponseData>>(
    `/v1/auction/basic-list?${queryString}`,
  );

  return response.data;
};
