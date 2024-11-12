import devApiClient from '@/apis/queryFunctions/devApiClient';
import { Category } from '@/apis/types/category';
// import { Response } from '@/apis/types/common';
// <Response<Category[]>>
// 이후 수정이 될 부분 타입이 하나 빠져있음

export const getCategory = async () => {
  const response = await devApiClient.get<Category[]>(`/v2/categories`);
  return response.data;
};
