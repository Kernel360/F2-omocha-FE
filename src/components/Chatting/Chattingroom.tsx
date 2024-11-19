import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ArrowRightIcon } from 'lucide-react';

import { getLastChat } from '@/apis/queryFunctions/chat';
import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import { OpenAuctionInfo, Message } from '@/apis/types/chat';
import useBidirectionalInfiniteScroll from '@/hooks/useBidirectionalInfiniteScroll';
import useBooleanState from '@/hooks/useBooleanState';

import * as S from './Chatting.css';
import useChatSocket from './hooks/useChatSocket';

export interface ChatroomProps {
  roomId: number;
  openAuctionInfo: OpenAuctionInfo | null;
  lastChat: Message[];
}

function Chattingroom({ roomId, openAuctionInfo, lastChat }: ChatroomProps) {
  const { data: user } = useGetUser();
  const { refetch } = useGetChatroomList({
    pageable: 0,
  });

  const [messages, setMessages] = useState<Message[]>(lastChat);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const isScrollToBottomRef = useRef<boolean>(false);
  const { value: bottomScrollButtonValue, setTrue, setFalse } = useBooleanState(false);

  const fetchLastChat = useCallback(async () => {
    const reversedMessages = await getLastChat(roomId, messages[0].created_at);
    if (reversedMessages) {
      const newLastChat = reversedMessages.content.map(message => message).reverse();
      setMessages(prevMessages => [...newLastChat, ...prevMessages]);
    }
  }, [roomId, messages]);

  useBidirectionalInfiniteScroll({
    sectionRef: chatContainerRef,
    upFetch: fetchLastChat,
  });

  const handleScroll = () => {
    if (!chatContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
    isScrollToBottomRef.current = scrollTop + clientHeight === scrollHeight;
    if (scrollHeight - scrollTop - clientHeight > 200) {
      setTrue();
    } else {
      setFalse();
    }
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

  const checkScroll = (senderId: number) => {
    if (isScrollToBottomRef.current) {
      scrollToBottom();
    } else if (!isScrollToBottomRef.current && senderId === user?.member_id) {
      scrollToBottom();
    }

    return false;
  };

  const checkBottom = () => {
    return isScrollToBottomRef.current;
  };

  const { client, newMessage, readNewChat } = useChatSocket({
    roomId,
    lastChat,
    setMessages,
    refetch,
    onConnect: scrollToBottom,
    onMessage: checkScroll,
    checkBottom,
  });

  const handleNewChat = () => {
    if (newMessage) {
      scrollToBottom();
      readNewChat();
    }
  };

  const sendMessage = async (message: string) => {
    client?.publish({
      destination: `/pub/${roomId}/messages`,
      body: JSON.stringify({
        message_type: 'CHAT',
        message,
        sender_member_id: user?.member_id,
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
          <span
            className={S.user}
          >{`구매자: ${openAuctionInfo?.buyer_name || openAuctionInfo?.buyer_id}`}</span>
          <span
            className={S.user}
          >{`판매자: ${openAuctionInfo?.seller_name || openAuctionInfo?.seller_id}`}</span>
        </div>
      </div>
      <div ref={chatContainerCallbackRef} className={S.chatListWrapper}>
        {messages.map(msg => {
          return (
            <div
              key={`${msg.created_at}+${msg.message}+${msg.sender_member_id}`}
              className={
                msg.sender_member_id === user?.member_id ? S.msgBox.myMsg : S.msgBox.opponentMsg
              }
              // 이 삼항 연산 부분 리팩토링 필요
            >
              <div
                className={
                  msg.sender_member_id === user?.member_id
                    ? S.msgWrapper.myMsg
                    : S.msgWrapper.opponentMsg
                }
              >
                <span className={S.msg}>{msg.message}</span>
              </div>
              <p
                className={
                  msg.sender_member_id === user?.member_id ? S.msgDate.myMsg : S.msgDate.opponentMsg
                }
              >
                {msg.created_at}
              </p>
            </div>
          );
        })}

        {newMessage && (
          <button
            type="button"
            className={`${S.newFloatingChat} ${newMessage ? 'visible' : 'hidden'}`}
            onClick={handleNewChat}
          >
            <span className={S.newFloatingChatMessage}>{newMessage.message}</span>
          </button>
        )}

        {bottomScrollButtonValue && (
          <button type="button" onClick={scrollToBottom} className={S.toBottomButton}>
            <ArrowRightIcon size={16} className={S.toBottomIcon} />
          </button>
        )}
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
