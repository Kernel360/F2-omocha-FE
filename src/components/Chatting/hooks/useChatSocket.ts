import { useRef, useState } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import { Message } from '@/apis/types/chat';
import useSocket from '@/hooks/useSocket';

interface UseChatSocketParams {
  roomId: number;
  lastChat: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  refetch: () => void;
  onConnect?: () => void;
  onMessage?: (senderId: number) => void;
  checkBottom?: () => boolean;
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
  const accessToken = sessionStorage.getItem('accessToken');

  const [newMessage, setNewMessage] = useState<Message | null>(null);
  const user = useGetUser();
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 타이머 ID 저장

  const pushMessage = ({
    nickname,
    sender_profile_image,
    message,
    sender_member_id,
    message_type,
  }: Message) => {
    // 메시지를 보내는 이벤트 입니다.
    setMessages(prevMessages => [
      ...prevMessages,
      {
        message_type,
        sender_member_id,
        room_id: roomId,
        nickname,
        sender_profile_image,
        message,
        created_at: new Date().toISOString(),
      },
    ]);

    if (onMessage) {
      onMessage(sender_member_id);
    }

    if (checkBottom) {
      const isBottom = checkBottom();

      if (!isBottom && sender_member_id !== user.data?.member_id) {
        setNewMessage({
          message_type,
          sender_member_id,
          room_id: roomId,
          nickname,
          sender_profile_image,
          message,
          created_at: new Date().toISOString(),
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
    access: accessToken,
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
          const receivedMessage: Message = JSON.parse(received_message.body);

          pushMessage({
            room_id: receivedMessage.room_id,
            message_type: receivedMessage.message_type,
            sender_member_id: receivedMessage.sender_member_id,
            nickname: receivedMessage.nickname,
            sender_profile_image: receivedMessage.sender_profile_image,
            message: receivedMessage.message,
            created_at: receivedMessage.created_at,
          });
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
