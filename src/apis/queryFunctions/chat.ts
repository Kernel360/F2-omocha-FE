import createApiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';
import { convertQueryParamsObjectToString } from '@/utils/paramUtils';

import {
  ChatroomListResponseData,
  GetChatroomListParams,
  GetLastChatResponseData,
} from '../types/chat';

const apiClient = createApiClient();

export const getChatroomList = async (param: GetChatroomListParams) => {
  const queryString = convertQueryParamsObjectToString<GetChatroomListParams>(param);
  const response = await apiClient.get<Response<ChatroomListResponseData>>(
    `/v2/chatroom?${queryString}`,
  );

  return response.data.result_data;
};

export const getLastChat = async (roomId: number | null, chatCreate?: string) => {
  const formatterCreateDateForApi =
    chatCreate && chatCreate.length > 1 ? chatCreate.replace(' ', 'T') : '';

  const response = await apiClient.get<Response<GetLastChatResponseData>>(
    `/v2/chatroom/${roomId}?cursor=${formatterCreateDateForApi}`,
  );

  return response.data.result_data;
};
