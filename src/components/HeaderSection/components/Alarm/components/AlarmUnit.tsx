import { XIcon } from 'lucide-react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import CommonImage from '@/components/CommonImage';
import useResizeViewportWidth from '@/hooks/useResizeViewportWidth';
import { Notification } from '@/provider/sseProvider';

import * as S from '../Alarm.css';

interface AlarmUnitProps {
  notice: Notification;
  noticeCodes: Record<string, string>;
  alarmTypes: Record<string, string>;
  onRemove: (id: number) => void;
}

function AlarmUnit({ notice, noticeCodes, alarmTypes, onRemove }: AlarmUnitProps) {
  const { data: auctionData } = useGetBasicAuction(notice.data.auction_id);
  const { viewportWidth } = useResizeViewportWidth();
  const imageSize = viewportWidth && viewportWidth > 700 ? 100 : 50;

  return (
    <>
      <a
        href={`/basicauction/${notice.data.auction_id}?category=${auctionData?.result_data.category_id}`}
        className={S.alarmLink}
      >
        <CommonImage
          className={S.image}
          src={`${process.env.NEXT_PUBLIC_S3_URL}${notice.data.thumbnail_path}`}
          alt="상품 이미지"
          width={imageSize}
          height={imageSize}
        />
        <ul className={S.alarmDetails}>
          <li className={S.alarmTitle}>
            <span className={`${alarmTypes[notice.notification_code]}`}>
              [{noticeCodes[notice.notification_code]}]
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
      </a>
      <button
        className={S.deleteButton}
        type="button"
        onClick={() => onRemove(notice.notification_id)}
      >
        <XIcon size="14" />
      </button>
    </>
  );
}

export default AlarmUnit;
