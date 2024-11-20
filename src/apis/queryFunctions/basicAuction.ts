import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  GetBasicAuctionListParams,
  BasicAuctionResponseData,
  GetBasicAuctionBidInfo,
  PostBasicAuctionBidParams,
  PostBasicAuctionBidResponseData,
  PostBasicAuctionResponseData,
  PostAuctionQnAParams,
  PostAuctionQnAResponseData,
  PostAuctionQnAAnswerResponseData,
  PostAuctionQnAAnswerParams,
  GetNowPriceResponseData,
  PostLikeParams,
  PostLikeResponseData,
  AuctionData,
  AuctionQnAData,
} from '@/apis/types/basicAuction';
import { ListResponse, Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

const apiClient = createApiClient();

export const postBasicAuction = async (param: FormData) => {
  const response = await apiClient.post<Response<PostBasicAuctionResponseData>>(
    '/v2/auctions',
    param,
  );

  return response.data;
};

export const getBasicAuction = async (id: number) => {
  const response = await apiClient.get<Response<BasicAuctionResponseData>>(`/v2/auctions/${id}`);
  return response.data;
};

export const getBasicAuctionList = async (params: GetBasicAuctionListParams) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListParams>(params);

  const response = await apiClient.get<Response<ListResponse<AuctionData[]>>>(
    `/v2/auctions?${queryString}`,
  );
  return response.data;
};

export const getBasicAuctionBidList = async (id: number) => {
  const response = await apiClient.get<Response<GetBasicAuctionBidInfo[]>>(`/v2/bids/${id}`);

  return response.data;
};

export const postBasicAuctionBid = async (id: number, param: PostBasicAuctionBidParams) => {
  const response = await apiClient.post<Response<PostBasicAuctionBidResponseData>>(
    `/v2/bids/${id}`,
    param,
  );

  return response.data;
};

export const postBasicAuctionInstantBuy = async (id: number) => {
  const response = await apiClient.post<Response<null>>(`/v2/bids/${id}/instant-buy`);

  return response.data;
};

export const deleteAuction = async (id: number) => {
  const response = await apiClient.delete<Response<null>>(`/v2/auctions/${id}`);

  return response.data;
};

export const getAuctionQnAList = async (id: number) => {
  const response = await apiClient.get<Response<ListResponse<AuctionQnAData[]>>>(
    `/v2/questions/${id}`,
  );

  return response.data;
};

export const postAuctionQnA = async (param: PostAuctionQnAParams) => {
  const response = await apiClient.post<Response<PostAuctionQnAResponseData>>(
    `/v2/questions`,
    param,
  );

  return response.data;
};

export const postAuctionQnAAnswer = async (param: PostAuctionQnAAnswerParams) => {
  const response = await apiClient.post<Response<PostAuctionQnAAnswerResponseData>>(
    `/v2/answers`,
    param,
  );

  return response.data;
};

export const deleteAuctionQnA = async (id: number) => {
  const response = await apiClient.delete<Response<null>>(`/v2/questions/${id}`);

  return response.data;
};

export const getNowPrice = async (id: number) => {
  const response = await apiClient.get<Response<GetNowPriceResponseData>>(
    `/v2/bids/${id}/now-price`,
  );

  return response.data;
};

// 찜 ----

export const postAuctionLike = async (id: number, params: PostLikeParams) => {
  const response = await apiClient.post<Response<PostLikeResponseData>>(
    `v2/auctions/likes/${id}`,
    params,
  );
  return response.data;
};
