import createApiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';

import { PostReview, PostReviewResponseData } from '../types/review';

const apiClient = createApiClient();

export const postReview = async (id: number, params: PostReview) => {
  const response = await apiClient.post<Response<PostReviewResponseData>>(
    `/v2/reviews/${id}`,
    params,
  );
  return response.data;
};
