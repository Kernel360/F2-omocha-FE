import { useRef, useState } from 'react';

import { RotateCwIcon } from 'lucide-react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import useGetBasicAuctionBidList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionBidList';
import useGetBasicAuctionNowPrice from '@/apis/queryHooks/basicAuction/useGetBasicAuctionNowPrice';

import * as S from './AuctionInfo.css';

interface AuctionPriceSectionProps {
  id: number;
  startPrice: number;
  instantBuyPrice: number | null;
}

function AuctionPriceSection({ id, startPrice, instantBuyPrice }: AuctionPriceSectionProps) {
  const { data: currentPrice, refetch } = useGetBasicAuctionNowPrice(id);
  const { refetch: refetchBasicAuction } = useGetBasicAuction(id);
  const { refetch: refetchBasicAuctionBidList } = useGetBasicAuctionBidList(id);

  const iconRef = useRef<HTMLButtonElement>(null);

  const [isRotating, setIsRotating] = useState(false);

  const refreshCurrentPrice = () => {
    setIsRotating(true);
    refetch();
    refetchBasicAuction();
    refetchBasicAuctionBidList();
    setTimeout(() => {
      setIsRotating(false);
    }, 1000); // 1초 동안 회전
  };

  return (
    <div>
      <div className={S.infoRow}>
        <span className={S.infoRowTitle}>시작가</span>
        <span>
          {startPrice.toLocaleString('ko-KR')}
          <span>원</span>
        </span>
      </div>
      <div className={`${S.infoRow} ${S.nowPrice}`}>
        <span className={S.infoRowTitle}>현재가</span>
        <span>
          {currentPrice && currentPrice.result_data.now_price !== 0
            ? ` ${currentPrice.result_data.now_price.toLocaleString('ko-KR')} 원`
            : '아직 입찰이 없습니다.'}
        </span>
      </div>

      <div className={`${S.infoRight} ${S.moveToRight}`}>
        <span
          className={`${S.calledTime} `}
        >{`${currentPrice ? currentPrice.result_data.called_at : '-'}불러옴`}</span>
        <button
          ref={iconRef}
          type="button"
          className={S.refreshCurrentPrice}
          onClick={refreshCurrentPrice}
        >
          <RotateCwIcon size={16} className={isRotating ? S.rotating : ''} />
        </button>
      </div>
      {instantBuyPrice && (
        <div className={`${S.infoRow} ${S.nowPrice}`}>
          <span className={S.infoRowTitle}>즉시 구매가</span>
          <span>
            {instantBuyPrice.toLocaleString('ko-KR')}
            <span>원</span>
          </span>
        </div>
      )}
    </div>
  );
}

export default AuctionPriceSection;
