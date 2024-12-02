import { Response } from '@/apis/types/common';

import { UploadImageResponseData } from '../types/images';

import createApiClient from './apiClient';

const apiClient = createApiClient();

export const uploadImage = async (params: FormData) => {
  console.log('params in uploadImage', params);
  const response = await apiClient.post<Response<UploadImageResponseData>>('/v2/images', params);
  return response.data;
};

export const deleteImage = async (params: string) => {
  const response = await apiClient.delete<Response<null>>(`/v2/images/${params}`);
  return response.data;
};
