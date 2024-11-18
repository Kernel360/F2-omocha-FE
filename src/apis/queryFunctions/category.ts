import createApiClient from '@/apis/queryFunctions/apiClient';
import { Category } from '@/apis/types/category';
import { Response } from '@/apis/types/common';

const apiClient = createApiClient();

export const getCategory = async () => {
  const response = await apiClient.get<Response<Category[]>>(`/v2/categories`);
  return response.data;
};
