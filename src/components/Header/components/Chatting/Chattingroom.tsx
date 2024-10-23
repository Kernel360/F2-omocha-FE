import { FormEvent, useCallback, useRef } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import { ChatMessage, OpenAuctionInfo } from '@/apis/types/chat';

import * as S from './Chatting.css';
import useBidirectionalInfiniteScroll from './hooks/useBidirectionalInfiniteScroll';
import useChatSocket from './hooks/useChatSocket';

export interface ChatroomProps {
  roomId: number;
  openAuctionInfo: OpenAuctionInfo | null;
  lastChat: ChatMessage[];
  setChatCreate: (chatCreate: string) => void;
}

function Chattingroom({ roomId, openAuctionInfo, lastChat, setChatCreate }: ChatroomProps) {
  const { data: user } = useGetUser();
  const { refetch } = useGetChatroomList({
    pageable: 0,
  });

  console.log('setChatCreate', setChatCreate); // 임시 lint용 console

  const seller = openAuctionInfo?.seller_name || `${openAuctionInfo?.seller_id}번 사용자`;
  const buyer = openAuctionInfo?.buyer_name || `${openAuctionInfo?.buyer_id}번 사용자`;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollToBottomRef = useRef<boolean>(false);

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    isScrollToBottomRef.current = scrollTop + clientHeight === scrollHeight;
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 100);
  };

  const chatContainerCallbackRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      chatContainerRef.current = node;
      node.addEventListener('scroll', handleScroll);
    }
  }, []);

  const checkScroll = () => {
    if (isScrollToBottomRef.current) {
      scrollToBottom();
    }
  };

  const { messages, client } = useChatSocket({
    roomId,
    lastChat,
    refetch,
    onConnect: scrollToBottom,
    onMessage: checkScroll,
  });

  const sendMessage = async (message: string) => {
    client?.publish({
      destination: `/pub/${roomId}/messages`,
      body: JSON.stringify({
        message_type: 'CHAT',
        message,
        sender_id: user?.member_id,
      }),
    });
  };

  // messages에 나는 새로운 lastChat이 넘어오면 스프레드 연산자들 통해서 상단에 붙이고 싶어

  const inputRef = useRef<HTMLInputElement>(null);

  const sendHandler = async (e: FormEvent) => {
    e.preventDefault();

    const message = inputRef.current?.value.trim();
    if (message && inputRef.current) {
      sendMessage(message);

      inputRef.current.value = '';
    }
  };

  const sectionRef = useBidirectionalInfiniteScroll({
    sectionRef: chatContainerRef,
    upFetch: () => {
      console.log('upFetch', lastChat[0].created_date);
    },
    downFetch: () => {
      console.log('downFetch', lastChat[lastChat.length - 1].created_date);
    },
  });

  console.log('sectionRef', sectionRef);

  return (
    <div className={S.chatroomContainer}>
      <div className={S.chatroomHeader}>
        <span className={S.chatroomName}>{openAuctionInfo?.room_name}</span>
        <div className={S.chatroomUserSection}>
          <span className={S.user}>{`판매자: ${seller}`}</span>
          <span className={S.user}>{`구매자: ${buyer}`}</span>
        </div>
      </div>
      <div ref={chatContainerCallbackRef} className={S.chatListWrapper}>
        {messages.map(msg => {
          return (
            <div
              key={`${msg.created_date}+${msg.message}+${msg.sender_id}`}
              className={msg.sender_id === user?.member_id ? S.msgBox.myMsg : S.msgBox.opponentMsg}
              // 이 삼항 연산 부분 리팩토링 필요
            >
              <div
                className={
                  msg.sender_id === user?.member_id ? S.msgWrapper.myMsg : S.msgWrapper.opponentMsg
                }
              >
                <span className={S.msg}>{msg.message}</span>
              </div>
              <p
                className={
                  msg.sender_id === user?.member_id ? S.msgDate.myMsg : S.msgDate.opponentMsg
                }
              >
                {msg.created_date}
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
