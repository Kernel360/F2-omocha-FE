import { CalendarClock } from 'lucide-react';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import { AuctionData } from '@/apis/types/basicAuction';
import CommonImage from '@/components/CommonImage';

import * as S from './SpecialSection.css';

function SpecialSection() {
  const { data } = useGetBasicAuctionList({
    title: '',
    auctionStatus: '',
    sort: '',
    direction: '',
    page: 0,
    size: 4,
  });

  if (!data) return null;

  return (
    <div className={S.specialSection}>
      <div className={S.specialSectionTitle}>
        <div className={S.flex}>
          <span className={S.only}>오직</span>
          <CalendarClock size={36} className={S.bellIcon} />
        </div>
        <span className={S.oneDay}>하루</span>
        <span className={S.popularItem}>인기 상품</span>
      </div>

      <div className={S.specialAuction}>
        {data.result_data.content.map((auction: AuctionData) => (
          <div key={auction.auction_id} className={S.specialAuctionItem}>
            <CommonImage
              src={`https://s3.ap-northeast-2.amazonaws.com/omocha.storages/${auction.image_keys[0]}`}
              className={S.specialAuctionImage}
              width={180}
              height={180}
              alt="image"
            />
            <div className={S.specialAuctionTitle}> {auction.title}</div>
            <div className={S.specialAuctionPrice}>
              <span className={S.specialAuctionPriceTitle}>현재가 </span>
              {auction.now_price.toLocaleString()} 원
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpecialSection;
