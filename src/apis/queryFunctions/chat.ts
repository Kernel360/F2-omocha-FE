// import createApiClient from '@/apis/queryFunctions/apiClient';
import { Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

import {
  ChatroomListResponseData,
  GetChatroomListParams,
  GetLastChatResponseData,
} from '../types/chat';

import createFetchApiClient from './featchApiClient';

export const getChatroomList = async (param: GetChatroomListParams) => {
  const queryString = convertQueryParamsObjectToString<GetChatroomListParams>(param);
  const response = await createFetchApiClient<Response<ChatroomListResponseData>>(
    `/v2/chatroom?${queryString}`,
  );

  if (!response) {
    throw new Error('Failed to getChatroomList');
  }

  return response;
};

export const getLastChat = async (roomId: number | null, chatCreate?: string) => {
  const formatterCreateDateForApi =
    chatCreate && chatCreate.length > 1 ? chatCreate.replace(' ', 'T') : '';

  const response = await createFetchApiClient<Response<GetLastChatResponseData>>(
    `/v2/chatroom/${roomId}?cursor=${formatterCreateDateForApi}`,
  );

  if (!response) {
    throw new Error('Failed to getLastChat');
  }

  return response;
};
