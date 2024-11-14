import { BidAuctionHistoriesDataResponseData, UserData } from '@/apis/types/User';
import { Response } from '@/apis/types/common';

import devApiClient from './devApiClient';

export const getUser = async () => {
  const response = await devApiClient.get<Response<UserData>>('/v2/myinfo/me');
  return response.data.result_data;
};

export const getBidAuctionHistories = async () => {
  const response = await devApiClient.get<Response<BidAuctionHistoriesDataResponseData>>(
    'api/v2/my-info/histories/bids',
  );
  return response.data.result_data;
};
