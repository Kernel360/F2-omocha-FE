import apiClient from '@/apis/queryFunctions/apiClient';
import {
  AuctionListResponseData,
  GetBasicAuctionListParams,
  BasicAuctionResponseData,
  GetBasicAuctionBidInfo,
  PostBasicAuctionBidParams,
  PostBasicAuctionBidResponseData,
  PostBasicAuctionResponseData,
  GetAuctionQnAListDataResponseData,
  PostAuctionQnAParams,
  PostAuctionQnAResponseData,
  PostAuctionQnAAnswerResponseData,
  PostAuctionQnAAnswerParams,
  GetNowPriceResponseData,
} from '@/apis/types/basicAuction';
import { Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

export const postBasicAuction = async (param: FormData) => {
  const response = await apiClient.post<Response<PostBasicAuctionResponseData>>(
    '/v1/auction',
    param,
  );

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

export const getBasicAuctionBidList = async (id: number) => {
  const response = await apiClient.get<Response<GetBasicAuctionBidInfo[]>>(`/v1/bid/${id}`);

  return response.data;
};

export const postBasicAuctionBid = async (id: number, param: PostBasicAuctionBidParams) => {
  const response = await apiClient.post<Response<PostBasicAuctionBidResponseData>>(
    `/v1/bid/${id}`,
    param,
  );

  return response.data;
};

export const deleteAuction = async (id: number) => {
  const response = await apiClient.delete<Response<null>>(`/v1/auction/${id}`);

  return response.data;
};

export const getAuctionQnAList = async (id: number) => {
  const response = await apiClient.get<Response<GetAuctionQnAListDataResponseData>>(
    `/v1/question/${id}/qna-list`,
    /// api/v1/question/{auctionId}/question-list
  );

  return response.data;
};

export const postAuctionQnA = async (param: PostAuctionQnAParams) => {
  const response = await apiClient.post<Response<PostAuctionQnAResponseData>>(
    `/v1/question`,
    param,
  );

  return response.data;
};

export const postAuctionQnAAnswer = async (param: PostAuctionQnAAnswerParams) => {
  const response = await apiClient.post<Response<PostAuctionQnAAnswerResponseData>>(
    `/v1/answer`,
    param,
  );

  return response.data;
};

export const deleteAuctionQnA = async (id: number) => {
  const response = await apiClient.delete<Response<null>>(`/v1/question/${id}`);

  return response.data;
};

export const getNowPrice = async (id: number) => {
  const response = await apiClient.get<Response<GetNowPriceResponseData>>(
    `/v1/bid/${id}/now-price`,
  );

  return response.data;
};
