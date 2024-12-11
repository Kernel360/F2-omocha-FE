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

import createFetchApiClient from './featchApiClient';

export const getUser = async () => {
  const response = await createFetchApiClient<Response<UserResponseData>>('/v2/member');
  if (!response) {
    throw new Error('Failed to getUser');
  }
  return response;
};
//----------------------------------------------

export const patchProfileImage = async (param: FormData) => {
  const response = await createFetchApiClient<Response<PatchProfileImageResponseData>>(
    '/v2/member/profile-image',
    {
      method: 'PATCH',
      body: param,
    },
  );
  if (!response) {
    throw new Error('Failed to patchProfileImage');
  }
  return response;
};

export const patchPassword = async (param: PatchPasswordParams) => {
  const response = await createFetchApiClient<Response<null>>('/v2/member/password', {
    method: 'PATCH',
    body: JSON.stringify(param),
  });
  if (!response) {
    throw new Error('Failed to patchPassword');
  }
  return response;
};

export const getBidAuctionHistories = async () => {
  const response =
    await createFetchApiClient<Response<ListResponse<BidAuctionHistoriesData[]>>>(
      '/v2/auctions/bid/me',
    );
  if (!response) {
    throw new Error('Failed to getBidAuctionHistories');
  }
  return response;
};

export const getBidAuctionHistoriesUnit = async (auctionId: number | null) => {
  const response = await createFetchApiClient<
    Response<ListResponse<BidAuctionHistoriesUnitData[]>>
  >(`/v2/bids/me/${auctionId}`);
  if (!response) {
    throw new Error('Failed to getBidAuctionHistoriesUnit');
  }
  return response;
};

export const getAuctionHistories = async () => {
  const response =
    await createFetchApiClient<Response<ListResponse<AuctionHistoriesData[]>>>('/v2/auctions/me');
  if (!response) {
    throw new Error('Failed to getAuctionHistories');
  }
  return response;
};

export const getAuctionLikeList = async (params: ListParams) => {
  const queryString = convertQueryParamsObjectToString(params);
  const response = await createFetchApiClient<Response<ListResponse<GetAuctionLikeData[]>>>(
    `/v2/auctions/likes?${queryString}`,
  );
  if (!response) {
    throw new Error('Failed to getAuctionLikeList');
  }
  return response;
};
