import apiClient from '@/apis/queryFunctions/apiClient';
import {
  PostBasicAuctionParams,
  PostBasicAuctionResponse,
  AuctionListResponse,
  BasicAuctionResponse,
  GetBasicAuctionListParams,
} from '@/apis/types/basicAuction';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

export const postBasicAuction = async (param: PostBasicAuctionParams) => {
  const response = await apiClient.post<PostBasicAuctionResponse>('/v1/auction', param);

  return response.data;
};

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
