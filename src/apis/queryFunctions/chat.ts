import apiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

import { ChatroomListResponseData, GetChatroomListParams } from '../types/chat';

export const getChatroomList = async (param: GetChatroomListParams) => {
  const queryString = convertQueryParamsObjectToString<GetChatroomListParams>(param);

  const response = await apiClient.get<Response<ChatroomListResponseData>>(
    `/v1/chatroom?${queryString}`,
  );

  return response.data.result_data;
};
