import AlarmUnit from '@/components/HeaderSection/components/Alarm/components/AlarmUnit';
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
            <AlarmUnit
              notice={notice}
              noticeCodes={SELLER_NOTICE_CODES}
              alarmTypes={S.alarmTypes}
              onRemove={onRemove}
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default Seller;
