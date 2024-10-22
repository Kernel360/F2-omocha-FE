import { useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { ChatMessage } from '@/apis/types/chat';

interface UseChatSocketProps {
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

function useChatSocket({ roomId, lastChat, refetch, onConnect, onMessage }: UseChatSocketProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(lastChat); // 초기화 안될지도
  const client = useRef<StompJs.Client>();
  const socket = new SockJS(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`);

  // const isScrollToBottomRef = useRef<boolean>(false);

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

  const subscribeToChatroom = () => {
    client.current?.subscribe(`/sub/channel/${roomId}`, received_message => {
      console.log('received_message:', received_message);
      const receivedMessage: ReceivedMessage = JSON.parse(received_message.body);

      pushMessage(
        receivedMessage.message,
        receivedMessage.created_date,
        receivedMessage.sender_id,
        'CHAT',
      );
      refetch();
    });
  };

  const connect = () => {
    client.current = new StompJs.Client({
      webSocketFactory: () => socket,
      debug: str => {
        console.log('debug', str);
      },
      onConnect: () => {
        // console.log('last Chat(in onConnect):', lastChat);
        // 여기서 lastChat을 setMessages로 넣어주면, 채팅방을 나갔다가 다시 들어왔을 때, 이전 채팅 내용이 다시 불러와집니다.
        // 그런데 lastChat을 호출하는 부분에서 새로운 채팅 내용을 불러오는 것이 아니라, 기존 채팅 내용을 불러오고 나서, 새로운 채팅 내용을 다시 불러오는 현상이 있었음.
        // 그래서 상위 파일에서 lastChat을 불러오는 부분을 useEffect를 사용하여 다시 호출함...
        // 고치긴 해야할 것 같음..
        setMessages(lastChat);
        subscribeToChatroom();
        if (onConnect) {
          onConnect();
        }
      },
      onWebSocketError: error => {
        console.log('WebSocket Error :', error);
      },
      onStompError: frame => {
        console.dir(`Broker reported error: ${frame.headers.message}`);
        console.dir(`Additional details: ${frame}`);
      },
    });

    client.current.activate();
  };

  const disconnect = () => {
    client.current?.deactivate();
  };

  useEffect(() => {
    connect();

    return () => {
      if (client) {
        disconnect();
      }
    };
  }, [roomId]);

  return { messages, pushMessage, setMessages, client: client.current };
}

export default useChatSocket;
