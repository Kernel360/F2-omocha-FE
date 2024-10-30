import { useRef, useState } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { ChatMessage } from '@/apis/types/chat';
import useSocket from '@/hooks/useSocket';

interface UseChatSocketParams {
  roomId: number;
  lastChat: ChatMessage[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  refetch: () => void;
  onConnect?: () => void;
  onMessage?: (senderId: number) => void;
  checkBottom?: () => boolean;
}

interface ReceivedMessage {
  created_date: string;
  message: string;
  room_id: number;
  sender_id: number;
  sender_nick_name: null | string;
  type: 'CHAT';
}

function useChatSocket({
  roomId,
  lastChat,
  setMessages,
  refetch,
  onConnect,
  onMessage,
  checkBottom,
}: UseChatSocketParams) {
  const [newMessage, setNewMessage] = useState<ChatMessage | null>(null);
  const user = useGetUser();
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 ID 저장

  const pushMessage = (newMessage: string, newDate: string, sender_id: number, type: 'CHAT') => {
    // 메시지를 보내는 이벤트 입니다.
    setMessages(prevMessages => [
      ...prevMessages,
      {
        message: newMessage,
        room_id: roomId,
        sender_nick_name: null,
        created_date: newDate,
        sender_id,
        type,
      },
    ]);

    if (onMessage) {
      onMessage(sender_id);
    }

    if (checkBottom) {
      const isBottom = checkBottom();

      if (!isBottom && sender_id !== user.data?.member_id) {
        setNewMessage({
          message: newMessage,
          room_id: roomId,
          sender_nick_name: null,
          created_date: newDate,
          sender_id,
          type,
        });
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setNewMessage(null);
          timerRef.current = null;
        }, 2000);
      }
    }
  };

  const { client } = useSocket({
    url: `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`,
    config: {
      // https://stomp-js.github.io/api-docs/latest/classes/Client.html
      // 문서 참고
      onConnect: () => {
        // 연결을 시도합니다.
        setMessages(lastChat);
      },
      onWebSocketError: error => {
        console.log('WebSocket Error :', error);
      },
      onStompError: frame => {
        console.dir(`Broker reported error: ${frame.headers.message}`);
        console.dir(`Additional details: ${frame}`);
      },
      debug: str => {
        console.log('debug', str);
      },
    },
    afterConnect: _client => {
      // 연결이 성공한 이후 진행할 작업닙니다.
      if (_client) {
        _client.subscribe(`/sub/channel/${roomId}`, received_message => {
          console.log('received_message: useSocket.ts', received_message);
          const receivedMessage: ReceivedMessage = JSON.parse(received_message.body);

          pushMessage(
            receivedMessage.message,
            receivedMessage.created_date,
            receivedMessage.sender_id,
            'CHAT',
          );
          refetch();
        });
      }

      if (onConnect) {
        onConnect();
      }
    },
  });

  const readNewChat = () => {
    setNewMessage(null);
  };

  return { pushMessage, setMessages, client, newMessage, readNewChat };
}

export default useChatSocket;
