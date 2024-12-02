import createApiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';

import { GetReviewsResponseData, PostReview, PostReviewResponseData } from '../types/review';

const apiClient = createApiClient();

export const postReview = async (id: number, params: PostReview) => {
  const response = await apiClient.post<Response<PostReviewResponseData>>(
    `/v2/reviews/${id}`,
    params,
  );
  return response.data;
};

export const getReceivedReviews = async () => {
  const response = await apiClient.get<Response<GetReviewsResponseData>>('/v2/reviews/received');
  return response.data;
};

export const getGivenReviews = async () => {
  const response = await apiClient.get<Response<GetReviewsResponseData>>('/v2/reviews/given');
  return response.data;
};
