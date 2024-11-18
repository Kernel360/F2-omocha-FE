import createApiClient from '@/apis/queryFunctions/apiClient';
import {
  PatchPasswordParams,
  PatchProfileImageResponseData,
  UserResponseData,
} from '@/apis/types/User';
import { Response } from '@/apis/types/common';

const apiClient = createApiClient();

export const getUser = async () => {
  const response = await apiClient.get<Response<UserResponseData>>('/v2/member');
  return response.data;
};

export const patchProfileImage = async (param: FormData) => {
  const response = await apiClient.patch<Response<PatchProfileImageResponseData>>(
    '/v2/member/profile-image',
    param,
  );
  return response.data;
};

export const patchPassword = async (param: PatchPasswordParams) => {
  const response = await apiClient.patch<Response<null>>('/v2/member/password', param);
  return response.data;
};
