import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  GetAuctionLikeData,
  PatchPasswordParams,
  PatchProfileImageResponseData,
  UserResponseData,
  BidAuctionHistoriesData,
  BidAuctionHistoriesUnitData,
  AuctionHistoriesData,
} from '@/apis/types/User';
import { ListParams, ListResponse, Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

const apiClient = createApiClient();

export const getUser = async () => {
  const response = await apiClient.get<Response<UserResponseData>>('/v2/member');
  return response.data;
};

export const patchProfileImage = async (param: FormData) => {
  const response = await apiClient.patch<Response<PatchProfileImageResponseData>>(
    '/v2/member/profile-image',
    param,
  );
  return response.data;
};

export const patchPassword = async (param: PatchPasswordParams) => {
  const response = await apiClient.patch<Response<null>>('/v2/member/password', param);
  return response.data;
};

export const getBidAuctionHistories = async () => {
  const response =
    await apiClient.get<Response<ListResponse<BidAuctionHistoriesData[]>>>('/v2/auctions/bid/me');
  return response.data;
};

export const getBidAuctionHistoriesUnit = async (auctionId: number | null) => {
  const response = await apiClient.get<Response<ListResponse<BidAuctionHistoriesUnitData[]>>>(
    `/v2/bids/me/${auctionId}`,
  );
  return response.data;
};

export const getAuctionHistories = async () => {
  const response =
    await apiClient.get<Response<ListResponse<AuctionHistoriesData[]>>>('/v2/auctions/me');
  return response.data;
};

export const getAuctionLikeList = async (params: ListParams) => {
  const queryString = convertQueryParamsObjectToString(params);
  const response = await apiClient.get<Response<ListResponse<GetAuctionLikeData[]>>>(
    `/v2/auctions/likes?${queryString}`,
  );

  return response.data;
};
