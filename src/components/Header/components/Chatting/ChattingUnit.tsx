/* eslint-disable @typescript-eslint/no-unused-vars */
// 임시로 넣음요

import * as S from './Chatting.css';

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

function ChattingUnit({
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
  return (
    <li key={room_id}>
      <div className={S.chattingUnitSection}>
        {/* //newRead ? S.isReadDot.read : S.isReadDot.noRead} /> */}
        <div className={S.chattingUnit}>
          <div className={S.chattingUnitInfo}>
            <span className={S.chatOpponent}>{seller_name || 'test'}</span>
            <span className={S.chatTitle}>{room_name}</span>
            <span className={S.recentChatTime}>nnn분전</span>
          </div>
          <span className={S.recentChat}>{created_date}</span>
        </div>
      </div>
    </li>
  );
}

export default ChattingUnit;
