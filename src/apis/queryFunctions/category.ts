import devApiClient from '@/apis/queryFunctions/devApiClient';
import { Category } from '@/apis/types/category';
import { Response } from '@/apis/types/common';

export const getCategory = async () => {
  const response = await devApiClient.get<Response<Category[]>>(`/v2/categories`);

  return response.data.result_data;
};
