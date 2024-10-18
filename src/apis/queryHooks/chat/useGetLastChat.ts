import { useQuery } from '@tanstack/react-query';

import { getLastChat } from '@/apis/queryFunctions/chat';

function useGetLastChat(roomId: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ['lastChat'],
    queryFn: () => getLastChat(roomId),
    staleTime: 0,
  });

  const messages = data?.messages.content;
  // content를 map 돌면서 message만 뽑아서 반환 근데 역순으로 해야함.
  const reversedMessages = messages?.map(message => message.message).reverse();
  const reversedM = messages?.map(message => message).reverse();

  return { data, error, isLoading, reversedMessages, reversedM };
}

export default useGetLastChat;
