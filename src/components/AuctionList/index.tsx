'use client';

import { Suspense } from 'react';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import { useAuth } from '@/provider/authProvider';

import * as S from './AuctionList.css';

export interface AuctionListProps {
  sort: string;
  direction: string;
  pathname: string;
  path: string;
}

export default function AuctionList({ sort, direction, pathname, path }: AuctionListProps) {
  const { isLoggedIn } = useAuth();

  const { data } = useGetBasicAuctionList({
    title: '',
    sort,
    direction,
    page: 0,
    size: 8,
    auctionStatus: 'BIDDING',
    isLogin: isLoggedIn,
  });

  if (!data) return null;

  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{pathname}</h3>
        <Link className={S.link} href={path}>
          경매 전체보기
          <ArrowRightIcon />
        </Link>
      </div>
      <div className={S.listWrapper}>
        <ListLayout>
          {data.result_data.content.map(item => (
            <Suspense key={item.auction_id} fallback={<>AuctionCard</>}>
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
              />
            </Suspense>
          ))}
        </ListLayout>
      </div>
    </section>
  );
}
