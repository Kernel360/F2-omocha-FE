import { UserData } from '@/apis/types/User';
import { Response } from '@/apis/types/common';

import apiClient from './apiClient';

export const getUser = async () => {
  const response = await apiClient.get<Response<UserData>>('/v2/myinfo/me');
  return response.data.result_data;
};
