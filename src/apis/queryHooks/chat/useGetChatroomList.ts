import { useQuery } from '@tanstack/react-query';

import { getChatroomList } from '@/apis/queryFunctions/chat';
import { GetChatroomListParams } from '@/apis/types/chat';

function useGetChatroomList(params: GetChatroomListParams) {
  const { data } = useQuery({
    queryKey: ['chatroomList', params],
    queryFn: () => getChatroomList(params),
  });

  return { data };
}

export default useGetChatroomList;
