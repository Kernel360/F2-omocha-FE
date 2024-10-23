import { useEffect, useState } from 'react';

import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import useGetLastChat from '@/apis/queryHooks/chat/useGetLastChat';
import { OpenAuctionInfo } from '@/apis/types/chat';
import ChevronDownIcon from '@/assets/svg/chevron-down.svg';

import * as S from './ChattingIconButton.css';
import ChattingUnit from './ChattingUnit';
import Chattingroom from './Chattingroom';

function ChattingList() {
  const { data, refetch } = useGetChatroomList({ pageable: 0 });
  const [chatCreate, setChatCreate] = useState<string>('');
  const [openChatroomId, setOpenChatroomId] = useState<number | null>(null);
  const [openAuctionInfo, setOpenAuctionInfo] = useState<OpenAuctionInfo | null>(null);
  const { reversedMessages, refetch: reversedMRefetch } = useGetLastChat(
    openChatroomId,
    chatCreate,
  );
  // const [lastChat, setLastChat] = useState<ChatMessage[]>([]);

  const handleRefetch = () => {
    setOpenChatroomId(null);
    refetch();
  };

  useEffect(() => {
    // reversedM이 중간에 바뀌기 때문에...
    if (!openChatroomId) return;
    reversedMRefetch();
  }, [reversedMessages]);

  if (!data) return null;

  // useEffect(() => {
  //   if (!openChatroomId) return;
  //   reversedMRefetch().then(_data => {
  //     if (!_data || !_data.data || !_data.data.messages.content) {
  //       return;
  //     }

  //     setLastChat(prevLastChat => [..._data.data.messages.content, ...prevLastChat]);
  //   });
  // }, [openChatroomId]);

  if (!data) return null;

  return (
    <div
      style={{
        minHeight: '480px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      {reversedMessages && openChatroomId ? (
        <>
          <button type="button" onClick={handleRefetch} className={S.goBackButton}>
            <ChevronDownIcon />
          </button>
          <Chattingroom
            roomId={openChatroomId}
            openAuctionInfo={openAuctionInfo}
            lastChat={reversedMessages}
            // setChatCreate={setChatCreate}
          />
        </>
      ) : (
        <div>
          <h3 className={S.title}>채팅 목록</h3>
          <ul className={S.chattingListWrapper}>
            {data.content.map(chat => (
              <button
                key={chat.auction_id}
                type="button"
                className={S.chattingUnitButton}
                onClick={() => {
                  setOpenChatroomId(chat.room_id);
                  setOpenAuctionInfo({
                    auction_id: chat.auction_id,
                    room_id: chat.room_id,
                    room_name: chat.room_name,
                    seller_id: chat.seller_id,
                    seller_name: chat.seller_name,
                    now_price: chat.now_price,
                    buyer_id: chat.buyer_id,
                    buyer_name: chat.buyer_name,
                  });
                }}
              >
                <ChattingUnit
                  auction_id={chat.auction_id}
                  room_id={chat.room_id}
                  room_name={chat.room_name}
                  seller_id={chat.seller_id}
                  seller_name={chat.seller_name}
                  now_price={chat.now_price}
                  buyer_id={chat.buyer_id}
                  buyer_name={chat.buyer_name}
                  created_date={chat.created_date}
                  last_message_time={chat.last_message_time}
                />
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChattingList;
