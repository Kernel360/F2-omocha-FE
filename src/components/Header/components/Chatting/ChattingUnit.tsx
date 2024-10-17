/* eslint-disable @typescript-eslint/no-unused-vars */
// 임시로 넣음요

import useGetUser from '@/apis/queryHooks/User/useGetUser';

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
  last_message_time: string; // ISO 날짜 형식으로 관리
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
  last_message_time,
}: ChattingListUnitProps) {
  const data = useGetUser();

  const other = seller_id === data.data?.member_id ? buyer_name : seller_name;

  const calLastMessage = () => {
    // 리팩토링때 공통 로직으로 빼기
    const lastMessage = new Date(last_message_time);
    const now = new Date();
    const diff = now.getTime() - lastMessage.getTime();
    const diffMin = Math.ceil(diff / 1000 / 60);
    // 여기서 60분 이상이면 시간으로만 return
    if (diffMin >= 60) {
      return `${Math.floor(diffMin / 60)}시간 전`;
    }

    return `${diffMin}분 전`;
  };

  return (
    <li key={room_id}>
      <div className={S.chattingUnitSection}>
        {/* //newRead ? S.isReadDot.read : S.isReadDot.noRead} /> */}
        <div className={S.chattingUnit}>
          <div className={S.chattingUnitInfo}>
            <span className={S.chatOpponent}>{other || '익명인'}</span>
            <span className={S.chatTitle}>{room_name}</span>
            <span className={S.recentChatTime}>{calLastMessage()}</span>
          </div>
          <span className={S.recentChat}>{created_date}</span>
        </div>
      </div>
    </li>
  );
}

export default ChattingUnit;
