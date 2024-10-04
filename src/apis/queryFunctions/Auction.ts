import apiClient from '@/apis/index';
import { PostBasicAuctionParams } from '@/apis/types/Auction';

export const postBasicAuction = (param: PostBasicAuctionParams) =>
  apiClient.post<PostBasicAuctionParams>('/v1/auction', param);
