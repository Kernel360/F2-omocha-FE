import AlarmUnit from '@/components/HeaderSection/components/Alarm/components/AlarmUnit';
import { Notification } from '@/provider/sseProvider';

import * as S from '../Alarm.css';

type NotificationCode = 'BID_BUYER' | 'CONCLUDE_BUYER' | 'CONCLUDE_OTHER_BUYER';

const BUYER_NOTICE_CODES: Record<NotificationCode, string> = {
  BID_BUYER: '입찰',
  CONCLUDE_BUYER: '낙찰',
  CONCLUDE_OTHER_BUYER: '유찰',
};

interface BuyerProps {
  noticeList: Notification[];
  onRemove: (id: number) => void;
}

function Buyer({ noticeList, onRemove }: BuyerProps) {
  return (
    <ul className={S.alarmList}>
      {noticeList.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>새로운 알림이 없습니다.</div>
        </div>
      ) : (
        noticeList.map(notice => (
          <li key={notice.notification_id} className={S.alarmItem}>
            <AlarmUnit
              notice={notice}
              noticeCodes={BUYER_NOTICE_CODES}
              alarmTypes={S.alarmTypes}
              onRemove={onRemove}
            />
          </li>
        ))
      )}
    </ul>
  );
}

export default Buyer;
