// import { useMutation } from '@tanstack/react-query';
// import { AxiosError } from 'axios';
// import { useRouter } from 'next/navigation';

// import { postLogin } from '@/apis/queryFunctions/Auth';
import apiClient from '@/apis/queryFunctions/apiClient';
// import { LoginParams } from '@/apis/types/Auth';
import { Response } from '@/apis/types/common';

export interface UserData {
  member_id: number;
  login_id: string;
}

export const getUser = async () => {
  const response = await apiClient.get<Response<UserData>>('/v1/myinfo/me');
  return response.data.result_data;
};

// export default getUser;
