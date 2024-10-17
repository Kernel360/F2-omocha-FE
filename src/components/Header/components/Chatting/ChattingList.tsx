import { useState } from 'react';

import useGetChatroomList from '@/apis/queryHooks/chat/useGetChatroomList';
import ChevronDownIcon from '@/assets/svg/chevron-down.svg';

import * as S from './ChattingIconButton.css';
import ChattingUnit from './ChattingUnit';
import Chattingroom from './Chattingroom';

function Chatting() {
  const { data } = useGetChatroomList({ pageable: 0 });

  const [openChatroomId, setOpenChatroomId] = useState<number | null>(null);

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
      {openChatroomId ? (
        <>
          <button type="button" onClick={() => setOpenChatroomId(null)} className={S.goBackButton}>
            <ChevronDownIcon />
          </button>
          <Chattingroom roomId={openChatroomId} />
        </>
      ) : (
        <>
          <h3 className={S.title}>채팅 목록</h3>
          <ul className={S.chattingListWrapper}>
            {data.content.map(chat => (
              <button
                key={chat.auction_id}
                type="button"
                className={S.chattingUnitButton}
                onClick={() => setOpenChatroomId(chat.room_id)}
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
                />
              </button>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Chatting;
