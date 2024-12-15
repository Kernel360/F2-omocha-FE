import { XIcon } from 'lucide-react';
import Link from 'next/link';

import CommonImage from '@/components/CommonImage';
import { Notification } from '@/provider/sseProvider';

import * as S from '../Alarm.css';

type NotificationCode = 'BID_SELLER' | 'CONCLUDE_SELLER' | 'CONCLUDE_NO_BIDS';

const SELLER_NOTICE_CODES: Record<NotificationCode, string> = {
  BID_SELLER: '입찰',
  CONCLUDE_SELLER: '낙찰',
  CONCLUDE_NO_BIDS: '패찰',
};

interface SellerProps {
  noticeList: Notification[];
  onRemove: (id: number) => void;
}

function Seller({ noticeList, onRemove }: SellerProps) {
  return (
    <ul className={S.alarmContainer}>
      {noticeList.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>새로운 알림이 없습니다.</div>
        </div>
      ) : (
        noticeList.map(notice => (
          <li key={notice.notification_id} className={S.alarmItem}>
            <Link href={`/basicauction/${notice.data.auction_id}`} className={S.alarmLink}>
              <CommonImage
                className={S.image}
                src={`${process.env.NEXT_PUBLIC_S3_URL}${notice.data.thumbnail_path}`}
                alt="상품 이미지"
                width={100}
                height={100}
              />
              <ul className={S.alarmDetails}>
                <li className={S.alarmTitle}>
                  <span className={`${S.alarmTypes[notice.notification_code as NotificationCode]}`}>
                    [{SELLER_NOTICE_CODES[notice.notification_code as NotificationCode]}]
                  </span>
                  <span>{notice.data.title}</span>
                </li>
                <li className={S.alarmData}>
                  <span className={S.listName}>현재가</span>
                  <span className={S.valueStyle.bidding}>{notice.data.now_price}원</span>
                </li>
                {notice.data.conclude_price && (
                  <li className={S.alarmData}>
                    <span className={S.listName}>낙찰가</span>
                    <span className={S.valueStyle.concluded}>{notice.data.conclude_price}원</span>
                  </li>
                )}
                <li className={S.alarmData}>
                  <span className={S.listName}>알림 시간</span>
                  <span className={S.listValue}>{notice.create_at}</span>
                </li>
              </ul>
            </Link>
            <button
              className={S.deleteButton}
              type="button"
              onClick={() => onRemove(notice.notification_id)}
            >
              <XIcon />
            </button>
          </li>
        ))
      )}
    </ul>
  );
}

export default Seller;
