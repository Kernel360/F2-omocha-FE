import { headers } from 'next/headers';

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

import createFetchApiClient from './featchApiClient';

export const postBasicAuction = async (param: FormData) => {
  const response = await createFetchApiClient<Response<PostBasicAuctionResponseData>>(
    '/v2/auctions',
    {
      method: 'POST',
      body: param,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers,
      },
    },
  );

  if (!response) {
    throw new Error('Failed to postBasicAuction');
  }

  return response;
};

export const getBasicAuction = async (id: number) => {
  const response = await createFetchApiClient<Response<BasicAuctionResponseData>>(
    `/v2/auctions/${id}`,
  );

  if (!response) {
    throw new Error('Failed to getBasicAuction');
  }

  return response;
};

export const getBasicAuctionList = async (params: GetBasicAuctionListParams) => {
  const queryString = convertQueryParamsObjectToString<GetBasicAuctionListParams>(params);

  const response = await createFetchApiClient<Response<ListResponse<AuctionData[]>>>(
    `/v2/auctions?${queryString}`,
  );

  if (!response) {
    throw new Error('Failed to getFetchBasicAuctionList');
  }

  return response;
};

export const getBasicAuctionBidList = async (id: number) => {
  const response = await createFetchApiClient<Response<GetBasicAuctionBidInfo[]>>(`/v2/bids/${id}`);

  if (!response) {
    throw new Error('Failed to getBasicAuctionBidList');
  }

  return response;
};

export const postBasicAuctionBid = async (id: number, param: PostBasicAuctionBidParams) => {
  const response = await createFetchApiClient<Response<PostBasicAuctionBidResponseData>>(
    `/v2/bids/${id}`,
    {
      method: 'POST',
      body: JSON.stringify(param),
    },
  );

  if (!response) {
    throw new Error('Failed to postBasicAuctionBid');
  }

  return response;
};

export const postBasicAuctionInstantBuy = async (id: number) => {
  const response = await createFetchApiClient<Response<null>>(`/v2/bids/${id}/instant-buy`, {
    method: 'POST',
  });

  if (!response) {
    throw new Error('Failed to postBasicAuctionInstantBuy');
  }

  return response;
};

export const deleteAuction = async (id: number) => {
  const response = await createFetchApiClient<Response<null>>(`/v2/auctions/${id}`, {
    method: 'DELETE',
  });

  if (!response) {
    throw new Error('Failed to deleteAuction');
  }

  return response;
};

export const getAuctionQnAList = async (id: number) => {
  const response = await createFetchApiClient<Response<ListResponse<AuctionQnAData[]>>>(
    `/v2/questions/${id}`,
  );

  if (!response) {
    throw new Error('Failed to getAuctionQnAList');
  }

  return response;
};

export const postAuctionQnA = async (param: PostAuctionQnAParams) => {
  const response = await createFetchApiClient<Response<PostAuctionQnAResponseData>>(
    `/v2/questions`,
    {
      method: 'POST',
      body: JSON.stringify(param),
    },
  );

  if (!response) {
    throw new Error('Failed to postAuctionQnA');
  }

  return response;
};

export const postAuctionQnAAnswer = async (param: PostAuctionQnAAnswerParams) => {
  const response = await createFetchApiClient<Response<PostAuctionQnAAnswerResponseData>>(
    `/v2/answers`,
    {
      method: 'POST',
      body: JSON.stringify(param),
    },
  );

  if (!response) {
    throw new Error('Failed to postAuctionQnAAnswer');
  }

  return response;
};

export const deleteAuctionQnA = async (id: number) => {
  const response = await createFetchApiClient<Response<null>>(`/v2/questions/${id}`, {
    method: 'DELETE',
  });

  if (!response) {
    throw new Error('Failed to deleteAuctionQnA');
  }

  return response;
};

export const getNowPrice = async (id: number) => {
  const response = await createFetchApiClient<Response<GetNowPriceResponseData>>(
    `/v2/bids/${id}/now-price`,
  );

  if (!response) {
    throw new Error('Failed to getNowPrice');
  }

  return response;
};

// 찜 ----

export const postAuctionLike = async (id: number, params: PostLikeParams) => {
  const response = await createFetchApiClient<Response<PostLikeResponseData>>(
    `v2/auctions/likes/${id}`,
    {
      method: 'POST',
      body: JSON.stringify(params),
    },
  );

  if (!response) {
    throw new Error('Failed to postAuctionLike');
  }

  return response;
};
