import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { UserData } from '@/apis/types/User';
import { GetChatroomListParams } from '@/apis/types/chat';

function useGetChatroomList(params: GetChatroomListParams, user: UserData | null) {
  const { data } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params),
    enabled: !!user,
  });

  return { data };
}

export default useGetChatroomList;
