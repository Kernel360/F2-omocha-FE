import { useState } from 'react';

import { ChatMessage } from '@/apis/types/chat';
import useSocket from '@/hooks/useSocket';

interface UseChatSocketParams {
  roomId: number;
  lastChat: ChatMessage[];
  refetch: () => void;
  onConnect?: () => void;
  onMessage?: () => void;
}

interface ReceivedMessage {
  created_date: string;
  message: string;
  room_id: number;
  sender_id: number;
  sender_nick_name: null | string;
  type: 'CHAT';
}

function useChatSocket({ roomId, lastChat, refetch, onConnect, onMessage }: UseChatSocketParams) {
  const [messages, setMessages] = useState<ChatMessage[]>(lastChat); // 초기화 안될지도

  const pushMessage = (newMessage: string, newDate: string, sender_id: number, type: 'CHAT') => {
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
      onMessage();
    }
  };

  const { client } = useSocket({
    url: `${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`,
    config: {
      onConnect: () => {
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

  return { messages, pushMessage, setMessages, client };
}

export default useChatSocket;
