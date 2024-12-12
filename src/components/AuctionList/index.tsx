'use client';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import mixpanel from '@/lib/mixpanel';
import { useAuth } from '@/provider/authProvider';

import * as S from './AuctionList.css';

export interface AuctionListProps {
  sort: string;
  direction: string;
  pathname: string;
  path: string;
  eventId: string;
}

export default function AuctionList({
  sort,
  direction,
  pathname,
  path,
  eventId,
}: AuctionListProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const { data } = useGetBasicAuctionList({
    title: '',
    sort,
    direction,
    page: 0,
    size: 8,
    auctionStatus: 'BIDDING',
    isLogin: isLoggedIn,
  });

  const handleMixpanel = () => {
    mixpanel.track(eventId);
  };

  if (!data) return null;

  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{pathname}</h3>
        <Link className={S.link} href={path} onClick={handleMixpanel}>
          경매 전체보기
          <ArrowRightIcon />
        </Link>
      </div>
      <div className={S.listWrapper}>
        {data.result_data.total_elements === 0 ? (
          <div className={S.noListWrapper}>
            <div className={S.noListTitle}>{`현재 경매중인 ${pathname}이 없습니다.`}</div>
            <button
              className={S.noListButton}
              type="button"
              onClick={() => router.push('/create')} // mixpanel 추가 필요
            >
              경매 등록하러 가기
            </button>
          </div>
        ) : (
          <ListLayout>
            {data.result_data.content.map(item => (
              <AuctionCard
                key={item.auction_id}
                id={item.auction_id}
                thumbnailImage={item.thumbnail_path}
                title={item.title}
                isLike={item.is_liked}
                startPrice={item.start_price}
                startTime={item.start_date}
                endTime={item.end_date}
                nowPrice={item.now_price}
                auctionStatus={item.auction_status}
                instantBuyPrice={item.instant_buy_price}
                pageContext="main_page"
              />
            ))}
          </ListLayout>
        )}
      </div>
    </section>
  );
}
