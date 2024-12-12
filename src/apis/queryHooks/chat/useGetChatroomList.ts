import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { GetChatroomListParams } from '@/apis/types/chat';
import { useAuth } from '@/provider/authProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetChatroomList(params: GetChatroomListParams) {
  const { isLoggedIn } = useAuth();

  const tokens = getAuthTokens();

  const { data, refetch } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params, tokens),
    enabled: !!isLoggedIn,
    staleTime: 0,
  });

  return { data, refetch };
}

export default useGetChatroomList;
