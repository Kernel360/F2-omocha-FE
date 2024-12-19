import { CircleCheckIcon } from 'lucide-react';

import Buyer from '@/components/HeaderSection/components/Alarm/components/Buyer';
import Seller from '@/components/HeaderSection/components/Alarm/components/Seller';
import TabsLayout from '@/components/TabsLayout';
import { useSSE } from '@/provider/sseProvider';

import * as S from './Alarm.css';

const SELLER_NOTICE_CODES = ['BID_SELLER', 'CONCLUDE_SELLER', 'CONCLUDE_NO_BIDS'];
const BUYER_NOTICE_CODES = ['BID_BUYER', 'CONCLUDE_BUYER', 'CONCLUDE_OTHER_BUYER'];

const TABS = [
  {
    title: '구매 알림',
    value: 'buyer',
  },
  {
    title: '판매 알림',
    value: 'seller',
  },
];

function Alarm() {
  const { noticeList, removeNotice, clearAllNotice } = useSSE();

  const buyerNoticeList = noticeList.filter(notice =>
    BUYER_NOTICE_CODES.includes(notice.notification_code),
  );
  const sellerNoticeList = noticeList.filter(notice =>
    SELLER_NOTICE_CODES.includes(notice.notification_code),
  );

  const TABS_CONTENT = [
    <Buyer key="buyer" noticeList={buyerNoticeList} onRemove={removeNotice} />,
    <Seller key="seller" noticeList={sellerNoticeList} onRemove={removeNotice} />,
  ];

  return (
    <div className={S.alarmContainer}>
      <div className={S.buttonContainer}>
        <button className={S.clearAllButton} type="button" onClick={clearAllNotice}>
          <CircleCheckIcon
            fill={noticeList.length > 0 ? '#23a750' : 'gray'}
            size="15"
            stroke="white"
          />
          모든 알림 삭제
        </button>
      </div>
      <section>
        <TabsLayout
          defaultTriggerValue={TABS[0].value}
          triggerTitleList={TABS}
          childrenList={TABS_CONTENT}
        />
      </section>
    </div>
  );
}

export default Alarm;
