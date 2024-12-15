'use client';

import { useEffect, useState } from 'react';

import { XIcon } from 'lucide-react';
import Link from 'next/link';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import CommonImage from '@/components/CommonImage';
import { useSSE, Notification } from '@/provider/sseProvider';

import * as S from '../Alarm.css';

type NotificationCode =
  | 'BID_BUYER'
  | 'CONCLUDE_BUYER'
  | 'CONCLUDE_OTHER_BUYER'
  | 'BID_SELLER'
  | 'CONCLUDE_SELLER'
  | 'CONCLUDE_NO_BIDS';

const NOTICE_CODES: Record<NotificationCode, string> = {
  BID_BUYER: '입찰',
  CONCLUDE_BUYER: '낙찰',
  CONCLUDE_OTHER_BUYER: '유찰',
  BID_SELLER: '입찰',
  CONCLUDE_SELLER: '낙찰',
  CONCLUDE_NO_BIDS: '패찰',
};

function AlarmSlide() {
  const { noticeList } = useSSE();

  const [showSlide, setShowSlide] = useState(false);
  const [prevNotice, setPrevNotice] = useState<Notification | null>(null);
  const noticeIndex = Math.max(noticeList.length - 1, 0);

  useEffect(() => {
    if (noticeList.length > 0) {
      const latestNotice = noticeList[noticeIndex];

      if (latestNotice.notification_id !== prevNotice?.notification_id) {
        setShowSlide(true);
        setPrevNotice(latestNotice);

        setTimeout(() => {
          setShowSlide(false);
        }, 5000);
      }
    }
  }, [noticeIndex, noticeList, prevNotice]);

  const { data: auctionData } = useGetBasicAuction(noticeList[noticeIndex]?.data.auction_id);

  return (
    <div>
      {showSlide && (
        <Link
          className={S.alarmSlide}
          href={`/basicauction/${noticeList[noticeIndex]?.data.auction_id}?category=${auctionData?.result_data.category_id}`}
        >
          <CommonImage
            className={S.image}
            src={`${process.env.NEXT_PUBLIC_S3_URL}${noticeList[noticeIndex]?.data.thumbnail_path}`}
            alt="상품 이미지"
            width={100}
            height={100}
          />
          <ul className={S.alarmDetails}>
            <li className={S.alarmTitle}>
              <span
                className={
                  S.alarmTypes[noticeList[noticeIndex]?.notification_code as NotificationCode]
                }
              >
                [{NOTICE_CODES[noticeList[noticeIndex]?.notification_code as NotificationCode]}]
              </span>
              <span>{noticeList[noticeIndex].data.title}</span>
            </li>
            <li className={S.alarmData}>
              <span className={S.listName}>현재가</span>
              <span className={S.valueStyle.bidding}>
                {noticeList[noticeIndex].data.now_price}원
              </span>
            </li>
            {noticeList[noticeIndex].data.conclude_price && (
              <li className={S.alarmData}>
                <span className={S.listName}>낙찰가</span>
                <span className={S.valueStyle.concluded}>
                  {noticeList[noticeIndex].data.conclude_price}원
                </span>
              </li>
            )}
            <li className={S.alarmData}>
              <span className={S.listName}>알림 시간</span>
              <span className={S.listValue}>{noticeList[noticeIndex].create_at}</span>
            </li>
          </ul>
          <button type="button" className={S.deleteSlideButton} onClick={() => setShowSlide(false)}>
            <XIcon size="14" />
          </button>
        </Link>
      )}
    </div>
  );
}

export default AlarmSlide;
