import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import { AuctionData } from '@/apis/types/basicAuction';
import mixpanel from '@/lib/mixpanel';
import EVENT_ID from '@/static/eventId';

import SkeletonCircle from '../Skeleton/components/SkeletonCircle';
import SkeletonText from '../Skeleton/components/SkeletonText';

import * as S from './SpecialSection.css';

function SpecialSectionData() {
  const router = useRouter();
  const { data, isLoading } = useGetBasicAuctionList({
    title: '',
    auctionStatus: 'BIDDING',
    sort: 'bidCount',
    direction: 'DESC',
    page: 0,
    size: 4,
  });

  const handleMixpanel = (index: number) => {
    mixpanel.track(EVENT_ID.DAILY_POPULAR_AUCTION_ITEM_CLICKED, {
      item_rank: index + 1, // 순위별로 사용자가 어느 것을 많이 클릭하는지 파악
    });
  };

  if (isLoading || !data) {
    // 4번 반복
    return (
      <div className={S.specialAuction}>
        {[...Array(4)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={S.specialAuction}>
            <SkeletonCircle size={180} />
            <div className={S.specialAuctionTitleSuspenseBlock}>
              <SkeletonText noOfLines={2} height={17} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return data.result_data.total_elements === 0 ? (
    <div className={S.noListWrapper}>
      <div className={S.noListTitle}>현재 인기 경매가 없습니다.</div>
      <button className={S.noListButton} type="button" onClick={() => router.push('/create')}>
        경매 등록하러 가기
      </button>
    </div>
  ) : (
    <div className={S.specialAuction}>
      {data.result_data.content.map((auction: AuctionData, index) => (
        <Link
          href={`/basicauction/${auction.auction_id}?categoryId=${auction.category_id}`}
          key={auction.auction_id}
          className={S.specialAuctionItem}
          onClick={() => handleMixpanel(index)}
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}${auction.thumbnail_path}`}
            className={S.specialAuctionImage}
            width={170}
            height={170}
            alt="image"
          />
          <div className={S.specialAuctionTitle}> {auction.title}</div>
          <div className={S.specialAuctionPrice}>
            <span className={S.specialAuctionPriceTitle}>현재가 </span>
            {auction.now_price
              ? ` ${auction.now_price.toLocaleString('ko-KR')} 원`
              : '입찰이 없습니다.'}
          </div>
          {auction.instant_buy_price && (
            <div className={S.specialAuctionPrice}>
              <span className={S.specialAuctionPriceTitle}>즉시 구매가 </span>
              {auction.instant_buy_price.toLocaleString()} 원
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

export default SpecialSectionData;
