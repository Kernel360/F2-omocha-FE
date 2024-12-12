import { Response } from '@/apis/types/common';
import convertQueryParamsObjectToString from '@/utils/convertQueryParamsObjectToString';

import {
  ChatroomListResponseData,
  GetChatroomListParams,
  GetLastChatResponseData,
} from '../types/chat';

import createFetchApiClient from './featchApiClient';

export const getChatroomList = async (
  param: GetChatroomListParams,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const queryString = convertQueryParamsObjectToString<GetChatroomListParams>(param);
  const response = await createFetchApiClient<Response<ChatroomListResponseData>>({
    endpoint: `/v2/chatroom?${queryString}`,
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to getChatroomList');
  }

  return response;
};

export const getLastChat = async (
  roomId: number | null,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
  chatCreate?: string,
) => {
  const formatterCreateDateForApi =
    chatCreate && chatCreate.length > 1 ? chatCreate.replace(' ', 'T') : '';

  const response = await createFetchApiClient<Response<GetLastChatResponseData>>({
    endpoint: `/v2/chatroom/${roomId}?cursor=${formatterCreateDateForApi}`,
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to getLastChat');
  }

  return response;
};
