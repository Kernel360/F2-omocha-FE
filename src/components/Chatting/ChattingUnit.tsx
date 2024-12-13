/* eslint-disable @typescript-eslint/no-unused-vars */

import useGetUser from '@/apis/queryHooks/User/useGetUser';

import CommonImage from '../CommonImage';

import * as S from './Chatting.css';

interface ChattingListUnitProps {
  auction_id: number;
  room_id: number;
  room_name: string;
  seller_id: number;
  seller_name: string | null;
  conclude_price: number;
  buyer_id: number;
  buyer_name: string | null;
  created_date: string; // ISO 날짜 형식으로 관리
  last_message_time: string | null; // ISO 날짜 형식으로 관리
  last_message: string | null;
  thumbnail: string;
}

function ChattingUnit({
  auction_id,
  room_id,
  room_name,
  seller_id,
  thumbnail,
  seller_name,
  conclude_price,
  buyer_id,
  buyer_name,
  created_date,
  last_message_time,
  last_message,
}: ChattingListUnitProps) {
  const data = useGetUser();

  const other = seller_id === data.data?.member_id ? buyer_name : seller_name;

  const calLastMessage = () => {
    if (!last_message_time) return '';

    const lastMessage = new Date(last_message_time);
    const now = new Date();
    const diff = now.getTime() - lastMessage.getTime();
    const diffMin = Math.ceil(diff / 1000 / 60);

    // 7일 이상 차이나면 날짜 형식으로 반환
    if (diffMin >= 60 * 24 * 7) {
      const month = lastMessage.getMonth() + 1; // getMonth() returns 0-11
      const day = lastMessage.getDate();
      return `${month}월 ${day}일`;
    }

    // 24시간 이상 차이나면 일 단위로 계산
    if (diffMin >= 60 * 24) {
      const diffDays = Math.floor(diffMin / (60 * 24));
      return `${diffDays}일 전`;
    }

    // 60분 이상이면 시간으로 표시
    if (diffMin >= 60) {
      return `${Math.floor(diffMin / 60)}시간 전`;
    }

    // 60분 미만이면 분으로 표시
    return `${diffMin}분 전`;
  };

  const lastMinute = calLastMessage();

  return (
    <li key={room_id} className={S.chattingWrapper}>
      <CommonImage
        width={50}
        height={50}
        src={`${process.env.NEXT_PUBLIC_S3_URL}${thumbnail}`}
        alt="경매 사진"
      />
      <div className={S.chattingUnitSection}>
        <div className={S.chattingUnit}>
          <div className={S.chattingUnitInfo}>
            <span className={S.chatOpponent}>{other || '익명인'}</span>
            <span className={S.recentChatTime}>{lastMinute}</span>
          </div>
          <span className={S.recentChat}>{last_message || ''}</span>
        </div>
      </div>
    </li>
  );
}

export default ChattingUnit;
