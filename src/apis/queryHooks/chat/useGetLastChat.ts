import { useQuery } from '@tanstack/react-query';

import { getLastChat } from '@/apis/queryFunctions/chat';

function useGetLastChat(roomId: number | null, chatCreate?: string) {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['lastChat', roomId, chatCreate],
    queryFn: () => getLastChat(roomId, chatCreate),
    enabled: !!roomId,
    staleTime: 0,
  });

  const messages = data?.content;
  const reversedMessages = messages?.map(message => message).reverse();

  return { data, error, isLoading, reversedMessages, refetch };
}

export default useGetLastChat;
