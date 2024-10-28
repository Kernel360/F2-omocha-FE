import { useQuery } from '@tanstack/react-query';

import { getLastChat } from '@/apis/queryFunctions/chat';

function useGetLastChat(roomId: number | null, chatCreate?: string) {
  console.log('chatCreate in useGetLastChat Hook', chatCreate);
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['lastChat', roomId, chatCreate],
    queryFn: () => getLastChat(roomId, chatCreate),
    enabled: !!roomId,
    staleTime: 0,
  });

  const messages = data?.messages.content;
  // content를 map 돌면서 message만 뽑아서 반환 근데 역순으로 해야함.
  const reversedMessages = messages?.map(message => message).reverse();

  return { data, error, isLoading, reversedMessages, refetch };
}

export default useGetLastChat;
