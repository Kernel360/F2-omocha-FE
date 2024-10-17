import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { GetChatroomListParams } from '@/apis/types/chat';
import { useAuth } from '@/provider/authProvider';

function useGetChatroomList(params: GetChatroomListParams) {
  const { isLoggedIn } = useAuth();

  const { data } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params),
    enabled: !!isLoggedIn,
  });

  return { data };
}

export default useGetChatroomList;
