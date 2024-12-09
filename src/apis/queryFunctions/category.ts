import { Category } from '@/apis/types/category';
import { Response } from '@/apis/types/common';

import createFetchApiClient from './featchApiClient';

export const getCategory = async () => {
  const response = await createFetchApiClient<Response<Category[]>>(`/v2/categories`);

  if (!response) {
    throw new Error('Failed to getCategory');
  }

  return response;
};
