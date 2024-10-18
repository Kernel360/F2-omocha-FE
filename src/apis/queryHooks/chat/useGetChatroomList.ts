import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { GetChatroomListParams } from '@/apis/types/chat';
import { useAuth } from '@/provider/authProvider';

function useGetChatroomList(params: GetChatroomListParams) {
  const { isLoggedIn } = useAuth();

  const { data, refetch } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params),
    enabled: !!isLoggedIn,
    staleTime: 0,
  });

  return { data, refetch };
}

export default useGetChatroomList;
