import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { GetChatroomListParams } from '@/apis/types/chat';
import { useAuth } from '@/provider/authProvider';
import { useCookies } from '@/provider/cookiesProvider';

function useGetChatroomList(params: GetChatroomListParams) {
  const { isLoggedIn } = useAuth();
  const { clientToken } = useCookies();

  const { data, refetch } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params, clientToken),
    enabled: !!isLoggedIn,
    staleTime: 0,
  });

  return { data, refetch };
}

export default useGetChatroomList;
