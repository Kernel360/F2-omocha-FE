import { Category } from '@/apis/types/category';
import { Response } from '@/apis/types/common';

import createFetchApiClient from './featchApiClient';

export const getCategory = async () => {
  const response = await createFetchApiClient<Response<Category[]>>({ endpoint: `/v2/categories` });

  console.log('response getCategory', response);
  if (!response) {
    throw new Error('Failed to getCategory');
  }

  return response;
};
