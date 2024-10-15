import { FormEvent, useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import { getUser } from '@/apis/testForChatting';

import * as S from './Chatting.css';

export interface ChatroomProps {
  roomId: number;
  close: () => void;
}

interface Message {
  text: string;
  type: 'CHAT' | 'sent'; // 메시지의 타입을 더 구체적으로 제한할 수 있음
}

function Chattingroom({ roomId, close }: ChatroomProps) {
  console.log('roomId', roomId, close);
  const [messages, setMessages] = useState<Message[]>([]);

  const pushMessage = (newMessage: string, type: Message['type']) => {
    setMessages(prevMessages => [...prevMessages, { text: newMessage, type }]);
  };

  const socket = new SockJS(`https://api.omocha-auction.com/omocha-websocket`);
  const client = useRef<StompJs.Client>();
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchUserId = async () => {
    try {
      const data = await getUser(); // getUser 호출
      const userId = data.member_id; // member_id 추출
      return userId; // userId를 반환
    } catch (error) {
      console.error('Error fetching user data:', error); // 에러 처리
      return null; // 에러 발생 시 null 반환
    }
  };

  useEffect(() => {
    const disconnect = () => {
      client.current?.deactivate();
      console.log('Disconnected 끊어버림');
    };

    const subscribeTest = () => {
      console.log('subscribe 하는 중....');

      client.current?.subscribe(
        `https://api.omocha-auction.com/sub/channel/${roomId}`,
        received_message => {
          console.log(`> Received message: ${received_message.body}`);

          pushMessage(received_message.body, 'CHAT');
        },
      );
    };

    const connect = () => {
      console.log('connect 하는 중...');
      client.current = new StompJs.Client({
        webSocketFactory: () => socket,
        debug: str => {
          console.log('debug', str);
        },
        onConnect: () => {
          console.log('Connected 내가 쓴거');
          subscribeTest();
        },
        onWebSocketError: error => {
          console.log('WebSocket Error 내가 쓴거:', error);
        },
        onStompError: frame => {
          console.dir(`Broker reported error 내가 쓴거: ${frame.headers.message}`);
          console.dir(`Additional details 내가 쓴거: ${frame}`);
          console.log('Stomp Error 내가 쓴거:', frame);
        },
      });

      console.log('activate 하기 전... 내가 쓴거');
      client.current.activate();
      // 연결이 끝나면 subscribe하도록 해주었고, client.current.activate()를 통해 활성화
    };

    connect();

    return () => {
      if (client) disconnect();
    };
  }, [roomId]);

  const sendMessage = async (message: string) => {
    const senderId = await fetchUserId();
    console.log('sendMessage 메시지', message);
    console.log('sendMessage senderId', senderId);
    // const destination = `https://api.omocha-auction.com/pub/${roomId}/messages`;
    console.log('Destination URL:', `https://api.omocha-auction.com/pub/${roomId}/messages`); // 생성된 URL을 확인합니다.

    client.current?.publish({
      destination: `https://api.omocha-auction.com/pub/${roomId}/messages`,
      body: JSON.stringify({
        message_type: 'CHAT',
        message,
        sender_id: senderId,
      }),
    });
  };

  const sendHandler = (e: FormEvent) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로딩 방지

    const message = inputRef.current?.value.trim();
    if (message && inputRef.current) {
      sendMessage(message); // 메시지를 전송하는 함수 호출
      pushMessage(message, 'CHAT');
      inputRef.current.value = ''; // 전송 후 입력 필드 초기화
    }
  };

  return (
    <div className={S.chatroomContainer}>
      <div>{roomId}</div>
      <div>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {/* // className={S[msg.type]} */}
            {msg.text}
          </div>
        ))}

        <form onSubmit={sendHandler}>
          <input
            type="text"
            ref={inputRef} // useRef로 input을 관리
            placeholder="메시지를 입력하세요..."
          />
          <button type="submit">전송</button>
        </form>
      </div>
    </div>
  );
}

export default Chattingroom;
