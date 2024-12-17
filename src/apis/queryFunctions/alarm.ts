import { Response } from '@/apis/types/common';

import createFetchApiClient from './featchApiClient';

export const postNotice = async (
  id: number,
  authorizationToken: {
    accessToken: string | undefined;
    refreshToken: string | undefined;
  },
) => {
  const response = await createFetchApiClient<Response<null>>({
    endpoint: `/v2/notifications/read/${id}`,
    options: {
      method: 'POST',
    },
    authorizationToken,
  });

  if (!response) {
    throw new Error('Failed to postNotice');
  }

  return response;
};
