import { useEffect, useState } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import useGetLastChat from '@/apis/queryHooks/chat/useGetLastChat';
import { OpenAuctionInfo } from '@/apis/types/chat';

import * as S from './ChattingIconButton.css';
import ChattingUnit from './ChattingUnit';
import Chattingroom from './Chattingroom';

function ChattingList() {
  const { data, refetch } = useGetChatroomList({ pageable: 0 });

  const [openChatroomId, setOpenChatroomId] = useState<number | null>(null);
  const [openAuctionInfo, setOpenAuctionInfo] = useState<OpenAuctionInfo | null>(null);
  const { reversedMessages, refetch: reversedMRefetch } = useGetLastChat(openChatroomId);

  const handleRefetch = () => {
    setOpenChatroomId(null);
    refetch();
  };

  useEffect(() => {
    if (!openChatroomId) return;
    reversedMRefetch();
  }, [reversedMessages]);

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
      {reversedMessages && openChatroomId && openAuctionInfo ? (
        <>
          <button type="button" onClick={handleRefetch} className={S.goBackButton}>
            <ChevronDownIcon size={18} />
          </button>
          <Chattingroom
            roomId={openChatroomId}
            openAuctionInfo={openAuctionInfo}
            lastChat={reversedMessages}
          />
        </>
      ) : (
        <div>
          <h3 className={S.title}>채팅 목록</h3>
          <ul className={S.chattingListWrapper}>
            {data.content.length === 0 ? (
              <div className={S.noListWrapper}>
                <div className={S.noListTitleWrapper}>
                  <div className={S.noListTitle}>아직 생성된 채팅이 없습니다.</div>
                  <div className={S.noListTitle}>채팅은 경매 낙찰 이후 자동 생성됩니다.</div>
                </div>
              </div>
            ) : (
              data.content.map(chat => (
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
                      seller_id: chat.seller_member_id,
                      seller_name: chat.seller_name,
                      conclude_price: chat.conclude_price,
                      buyer_id: chat.buyer_member_id,
                      buyer_name: chat.buyer_name,
                      thumbnail_path: chat.thumbnail_path,
                    });
                  }}
                >
                  <ChattingUnit
                    auction_id={chat.auction_id}
                    room_id={chat.room_id}
                    room_name={chat.room_name}
                    seller_id={chat.seller_member_id}
                    seller_name={chat.seller_name}
                    thumbnail={chat.thumbnail_path}
                    conclude_price={chat.conclude_price}
                    buyer_id={chat.buyer_member_id}
                    buyer_name={chat.buyer_name}
                    created_date={chat.created_date}
                    last_message_time={chat.last_message_time}
                    last_message={chat.last_message}
                  />
                </button>
              ))
            )}
            {/* {data.content.map(chat => (
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
                    seller_id: chat.seller_member_id,
                    seller_name: chat.seller_name,
                    conclude_price: chat.conclude_price,
                    buyer_id: chat.buyer_member_id,
                    buyer_name: chat.buyer_name,
                    thumbnail_path: chat.thumbnail_path,
                  });
                }}
              >
                <ChattingUnit
                  auction_id={chat.auction_id}
                  room_id={chat.room_id}
                  room_name={chat.room_name}
                  seller_id={chat.seller_member_id}
                  seller_name={chat.seller_name}
                  thumbnail={chat.thumbnail_path}
                  conclude_price={chat.conclude_price}
                  buyer_id={chat.buyer_member_id}
                  buyer_name={chat.buyer_name}
                  created_date={chat.created_date}
                  last_message_time={chat.last_message_time}
                  last_message={chat.last_message}
                />
              </button>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ChattingList;
