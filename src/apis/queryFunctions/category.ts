import { Category } from '@/apis/types/category';
import { Response } from '@/apis/types/common';

import apiClient from './apiClient';

export const getCategory = async () => {
  const response = await apiClient.get<Response<Category[]>>(`/v2/categories`);
  return response.data;
};
