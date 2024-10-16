import useBooleanState from '@/hooks/useBooleanState';

import * as S from './Chatting.css';
import Chattingroom from './Chattingroom';

interface ChattingListUnitProps {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_id: number;
  seller_name: string | null;
  now_price: number;
  buyer_id: number;
  buyer_name: string | null;
  created_date: string; // ISO 날짜 형식으로 관리
}

function ChattingListUnit({
  auction_id,
  room_id,
  room_name,
  seller_id,
  seller_name,
  now_price,
  buyer_id,
  buyer_name,
  created_date,
}: ChattingListUnitProps) {
  console.log('auction_id', auction_id); // 임시 console
  console.log('seller_id', seller_id);
  console.log('now_price', now_price);
  console.log('buyer_id', buyer_id);
  console.log('buyer_name', buyer_name);

  const {
    value: isOpenChatroomModal,
    toggle: setIsOpenChatroomListModal,
    setFalse: closeChatroomListModal,
  } = useBooleanState();

  return (
    <>
      <li key={room_id}>
        <button
          type="button"
          className={S.chattingUnitSection}
          onClick={setIsOpenChatroomListModal}
        >
          <div className={S.isReadDot.read} />
          {/* //newRead ? S.isReadDot.read : S.isReadDot.noRead} /> */}
          <div className={S.chattingUnit}>
            <div className={S.chattingUnitInfo}>
              <span className={S.chatOpponent}>{seller_name || 'test'}</span>
              <span className={S.chatTitle}>{room_name}</span>
              <span className={S.recentChatTime}>nnn분전</span>
            </div>
            <span className={S.recentChat}>{created_date}</span>
          </div>
        </button>
      </li>
      {isOpenChatroomModal && <Chattingroom roomId={room_id} close={closeChatroomListModal} />}
      {/* </ChatModal> */}
    </>
  );
}

export default ChattingListUnit;
