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
  PostLikeResponseData,
  AuctionData,
  AuctionQnAData,
} from '@/apis/types/basicAuction';
import { ListResponse, Response } from '@/apis/types/common';
import { convertQueryParamsObjectToString } from '@/utils/paramUtils';

import createFetchApiClient from './featchApiClient';

export const postBasicAuction = async (
  param: FormData,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PostBasicAuctionResponseData>>({
    endpoint: '/v2/auctions',
    options: {
      method: 'POST',
      body: param,
      headers: {
        Authorization: `${authorizationToken.accessToken}`,
      },
    },
  });

  if (!response) {
    throw new Error('Failed to postBasicAuction');
  }

  return response;
};

export const getBasicAuction = async (id: number) => {
  const response = await createFetchApiClient<Response<BasicAuctionResponseData>>({
    endpoint: `/v2/auctions/${id}`,
  });

  if (!response) {
    throw new Error('Failed to getBasicAuction');
  }

  return response;
};

export const getBasicAuctionList = async (
  params: GetBasicAuctionListParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListParams>(params);

  const response = await createFetchApiClient<Response<ListResponse<AuctionData[]>>>({
    endpoint: `/v2/auctions?${queryString}`,
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to getFetchBasicAuctionList');
  }

  return response;
};

export const getBasicAuctionBidList = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<GetBasicAuctionBidInfo[]>>({
    endpoint: `/v2/bids/${id}`,
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to getBasicAuctionBidList');
  }

  return response;
};

export const postBasicAuctionBid = async (
  id: number,
  param: PostBasicAuctionBidParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PostBasicAuctionBidResponseData>>({
    endpoint: `/v2/bids/${id}`,
    options: {
      method: 'POST',
      body: JSON.stringify(param),
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to postBasicAuctionBid');
  }

  return response;
};

export const postBasicAuctionInstantBuy = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: `/v2/bids/${id}/instant-buy`,
    options: {
      method: 'POST',
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to postBasicAuctionInstantBuy');
  }

  return response;
};

export const deleteAuction = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: `/v2/auctions/${id}`,
    options: {
      method: 'DELETE',
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to deleteAuction');
  }

  return response;
};

export const getAuctionQnAList = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<ListResponse<AuctionQnAData[]>>>({
    endpoint: `/v2/questions/${id}`,
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to getAuctionQnAList');
  }

  return response;
};

export const postAuctionQnA = async (
  param: PostAuctionQnAParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PostAuctionQnAResponseData>>({
    endpoint: `/v2/questions`,
    options: {
      method: 'POST',
      body: JSON.stringify(param),
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to postAuctionQnA');
  }

  return response;
};

export const postAuctionQnAAnswer = async (
  param: PostAuctionQnAAnswerParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PostAuctionQnAAnswerResponseData>>({
    endpoint: `/v2/answers`,
    options: {
      method: 'POST',
      body: JSON.stringify(param),
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to postAuctionQnAAnswer');
  }

  return response;
};

export const deleteAuctionQnA = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: `/v2/questions/${id}`,
    options: {
      method: 'DELETE',
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to deleteAuctionQnA');
  }

  return response;
};

export const getNowPrice = async (id: number) => {
  const response = await createFetchApiClient<Response<GetNowPriceResponseData>>({
    endpoint: `/v2/bids/${id}/now-price`,
  });

  if (!response) {
    throw new Error('Failed to getNowPrice');
  }

  return response;
};

// 찜 ----

export const postAuctionLike = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<PostLikeResponseData>>({
    endpoint: `/v2/auctions/likes/${id}`,
    options: {
      method: 'POST',
    },
    authorizationToken,
  });

  return response;
};
