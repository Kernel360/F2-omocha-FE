import { FormEvent, useEffect, useRef, useState } from 'react';

import * as StompJs from '@stomp/stompjs';
import SockJS from 'sockjs-client';

import useUserStore from '@/store/useUserStore';

import * as S from './Chatting.css';

export interface ChatroomProps {
  roomId: number;
  close: () => void;
}

interface Message {
  text: string;
  date: string;
  sender_id: number;
  type: 'CHAT';
}

interface ReceivedMessage {
  created_date: string;
  message: string;
  room_id: number;
  sender_id: number;
  sender_nick_name: null | string;
  type: 'CHAT';
}

// const ME = 10;

function Chattingroom({ roomId, close }: ChatroomProps) {
  console.log(close); // lint 방지용 console
  const user = useUserStore(state => state.user);

  const [messages, setMessages] = useState<Message[]>([]);

  const pushMessage = (
    newMessage: string,
    newDate: string,
    sender_id: number,
    type: Message['type'],
  ) => {
    setMessages(prevMessages => [
      ...prevMessages,
      {
        text: newMessage,
        date: newDate,
        sender_id,
        type,
      },
    ]);
  };

  const socket = new SockJS(`${process.env.NEXT_PUBLIC_SOCKET_SERVER_URL}`);
  const client = useRef<StompJs.Client>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const disconnect = () => {
      client.current?.deactivate();
    };

    const subscribeTest = () => {
      client.current?.subscribe(`/sub/channel/${roomId}`, received_message => {
        const receivedMessage: ReceivedMessage = JSON.parse(received_message.body);
        console.log('> Received message:', receivedMessage);

        pushMessage(
          receivedMessage.message,
          receivedMessage.created_date,
          receivedMessage.sender_id,
          'CHAT',
        );
      });
    };

    const connect = () => {
      client.current = new StompJs.Client({
        webSocketFactory: () => socket,
        debug: str => {
          console.log('debug', str);
        },
        onConnect: () => {
          subscribeTest();
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

    connect();

    return () => {
      if (client) disconnect();
    };
  }, [roomId]);

  const sendMessage = async (message: string) => {
    console.log('Destination URL:', `https://api.omocha-auction.com/pub/${roomId}/messages`); // 생성된 URL을 확인합니다.

    client.current?.publish({
      destination: `/pub/${roomId}/messages`,
      body: JSON.stringify({
        message_type: 'CHAT',
        message,
        sender_id: user?.member_id,
      }),
    });
  };

  const sendHandler = async (e: FormEvent) => {
    e.preventDefault();

    const message = inputRef.current?.value.trim();
    if (message && inputRef.current) {
      sendMessage(message);

      inputRef.current.value = '';
    }
  };

  return (
    <div className={S.chatroomContainer}>
      <div className={S.chatroomHeader}>{roomId}</div>
      <div className={S.chatListWrapper}>
        {messages.map(msg => {
          return (
            <div
              key={`${msg.date}+${msg.text}`}
              className={msg.sender_id === user?.member_id ? S.msgBox.myMsg : S.msgBox.opponentMsg}
              // 이 삼항 연산 부분 리팩토링 필요
            >
              <div
                className={
                  msg.sender_id === user?.member_id ? S.msgWrapper.myMsg : S.msgWrapper.opponentMsg
                }
              >
                <span className={S.msg}>{msg.text}</span>
              </div>
              <p
                className={
                  msg.sender_id === user?.member_id ? S.msgDate.myMsg : S.msgDate.opponentMsg
                }
              >
                {msg.date}
              </p>
            </div>
          );
        })}
      </div>
      <form onSubmit={sendHandler}>
        <div className={S.inputSection}>
          <input
            type="text"
            ref={inputRef}
            placeholder="메시지를 입력하세요..."
            className={S.inputWrapper}
          />
          <button type="submit" className={S.submitButton}>
            전송
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chattingroom;
