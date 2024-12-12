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

export const getUser = async (authorizationToken: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}) => {
  const response = await createFetchApiClient<Response<UserResponseData>>({
    endpoint: '/v2/member',
    authorizationToken,
  });
  if (!response) {
    throw new Error('Failed to getUser');
  }
  return response;
};
//----------------------------------------------

export const patchProfileImage = async (
  param: FormData,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PatchProfileImageResponseData>>({
    endpoint: '/v2/member/profile-image',
    options: {
      method: 'PATCH',
      body: param,
    },
    authorizationToken,
  });
  if (!response) {
    throw new Error('Failed to patchProfileImage');
  }
  return response;
};

export const patchPassword = async (param: PatchPasswordParams) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: '/v2/member/password',
    options: {
      method: 'PATCH',
      body: JSON.stringify(param),
    },
  });
  if (!response) {
    throw new Error('Failed to patchPassword');
  }
  return response;
};

export const getBidAuctionHistories = async (authorizationToken: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}) => {
  const response = await createFetchApiClient<Response<ListResponse<BidAuctionHistoriesData[]>>>({
    endpoint: '/v2/auctions/bid/me',
    authorizationToken,
  });
  if (!response) {
    throw new Error('Failed to getBidAuctionHistories');
  }
  return response;
};

export const getBidAuctionHistoriesUnit = async (
  auctionId: number | null,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<
    Response<ListResponse<BidAuctionHistoriesUnitData[]>>
  >({ endpoint: `/v2/bids/me/${auctionId}`, authorizationToken });
  if (!response) {
    throw new Error('Failed to getBidAuctionHistoriesUnit');
  }
  return response;
};

export const getAuctionHistories = async (authorizationToken: {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}) => {
  const response = await createFetchApiClient<Response<ListResponse<AuctionHistoriesData[]>>>({
    endpoint: '/v2/auctions/me',
    authorizationToken,
  });
  if (!response) {
    throw new Error('Failed to getAuctionHistories');
  }
  return response;
};

export const getAuctionLikeList = async (
  params: ListParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const queryString = convertQueryParamsObjectToString(params);
  const response = await createFetchApiClient<Response<ListResponse<GetAuctionLikeData[]>>>({
    endpoint: `/v2/auctions/likes?${queryString}`,
    authorizationToken,
  });
  if (!response) {
    throw new Error('Failed to getAuctionLikeList');
  }
  return response;
};
