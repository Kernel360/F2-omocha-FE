import apiClient from '@/apis/queryFunctions/apiClient';
import { UserData } from '@/apis/types/User';
import { Response } from '@/apis/types/common';

export const getUser = async () => {
  const response = await apiClient.get<Response<UserData>>('/v2/myinfo/me');
  return response.data.result_data;
};
