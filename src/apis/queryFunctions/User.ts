import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  PatchPasswordParams,
  PatchProfileImageResponseData,
  UserResponseData,
  BidAuctionHistoriesDataResponseData,
  BidAuctionHistoriesUnitDataResponseData,
  AuctionHistoriesDataResponseData,
} from '@/apis/types/User';
import { Response } from '@/apis/types/common';

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
    await apiClient.get<Response<BidAuctionHistoriesDataResponseData>>('/v2/auctions/bid/me');
  return response.data;
};

export const getBidAuctionHistoriesUnit = async (auctionId: number | null) => {
  const response = await apiClient.get<Response<BidAuctionHistoriesUnitDataResponseData>>(
    `/v2/bids/me/${auctionId}`,
  );
  return response.data;
};

export const getAuctionHistories = async () => {
  const response =
    await apiClient.get<Response<AuctionHistoriesDataResponseData>>('/v2/auctions/me');
  return response.data;
};
