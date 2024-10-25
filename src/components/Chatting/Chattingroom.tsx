import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getLastChat } from '@/apis/queryFunctions/chat';
import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import { ChatMessage, OpenAuctionInfo } from '@/apis/types/chat';
import ArrowRightIcon from '@/assets/svg/arrow-right.svg';
import useBidirectionalInfiniteScroll from '@/hooks/useBidirectionalInfiniteScroll';

import * as S from './Chatting.css';
import useChatSocket from './hooks/useChatSocket';

export interface ChatroomProps {
  roomId: number;
  openAuctionInfo: OpenAuctionInfo | null;
  lastChat: ChatMessage[];
}

function Chattingroom({ roomId, openAuctionInfo, lastChat }: ChatroomProps) {
  const { data: user } = useGetUser();
  const { refetch } = useGetChatroomList({
    pageable: 0,
  });

  const [messages, setMessages] = useState<ChatMessage[]>(lastChat); // 초기화 안될지도
  // const [isVisibleToBottomButton, setIsVisibleToBottomButton] = useState<boolean>(false);
  const seller = openAuctionInfo?.seller_name || `${openAuctionInfo?.seller_id}번 사용자`;
  const buyer = openAuctionInfo?.buyer_name || `${openAuctionInfo?.buyer_id}번 사용자`;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollToBottomRef = useRef<boolean>(false);

  const fetchLastChat = useCallback(async () => {
    const reversedMessages = await getLastChat(roomId, messages[0].created_date);
    if (reversedMessages) {
      const testValue = reversedMessages.messages.content.map(message => message).reverse();
      setMessages(prevMessages => [...testValue, ...prevMessages]);
    }
  }, [roomId, messages]);

  useBidirectionalInfiniteScroll({
    sectionRef: chatContainerRef,
    upFetch: fetchLastChat,
    downFetch: () => {
      console.log('downFetch', lastChat[lastChat.length - 1].created_date);
    },
  });

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    isScrollToBottomRef.current = scrollTop + clientHeight === scrollHeight;
    // if (scrollTop <= 80) {
    //   setIsVisibleToBottomButton(true);
    // } else {
    //   setIsVisibleToBottomButton(false);
    // }
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

  // const isVisibleAboutPosition = (threshold = 50) => {
  //   // threshold 기본값을 설정 (예: 50px)
  //   if (chatContainerRef.current) {
  //     const { scrollTop } = chatContainerRef.current;
  //     return scrollTop <= threshold;
  //   }
  //   return false;
  // };

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

  const { client } = useChatSocket({
    roomId,
    lastChat,
    setMessages,
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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sendHandler = async () => {
    const message = inputRef.current?.value.trim();
    if (message && inputRef.current) {
      sendMessage(message);
      inputRef.current.value = '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendHandler();
    }
  };

  useEffect(() => {
    return () => {
      if (chatContainerRef.current) {
        chatContainerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

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
        {/* {isVisibleToBottomButton && ( */}
        <button type="button" onClick={scrollToBottom} className={S.toBottomButton}>
          <ArrowRightIcon className={S.toBottomIcon} />
        </button>
        {/* )} */}
      </div>

      <div className={S.inputSection}>
        <textarea
          ref={inputRef}
          placeholder="메시지를 입력하세요..."
          className={S.inputWrapper}
          onKeyUp={handleKeyDown}
        />
        <button type="button" className={S.submitButton} onClick={sendHandler}>
          전송
        </button>
      </div>
    </div>
  );
}

export default Chattingroom;
