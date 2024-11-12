import apiClient from '@/apis/queryFunctions/apiClient';
import { PatchProfileImageResponseData, UserResponseData } from '@/apis/types/User';
import { Response } from '@/apis/types/common';

export const getUser = async () => {
  const response = await apiClient.get<Response<UserResponseData>>('/v2/myinfo/me');
  return response.data.result_data;
};

export const patchProfileImage = async (param: FormData) => {
  const response = await apiClient.patch<Response<PatchProfileImageResponseData>>(
    '/v2/myinfo/profile-image',
    param,
  );
  return response.data;
};
