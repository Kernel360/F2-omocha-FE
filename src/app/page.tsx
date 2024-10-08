'use client';

import Link from 'next/link';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import ArrowRightIcon from '@/assets/svg/arrow-right.svg';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

import * as S from './page.css';

export default function Home() {
  const { data } = useGetBasicAuctionList({
    title: '',
    sort: [],
    page: 0,
    size: 4,
  });

  if (!data) return null;

  const isActive = false;

  return (
    <div>
      <section className={S.section}>
        <div className={S.title}>
          <h3>신규 경매 상품</h3>
        </div>
      </section>
      <section className={S.section}>
        <div className={S.title}>
          <h3>마감 임박 상품</h3>
        </div>
      </section>
      {isActive && (
        <section className={S.section}>
          <div>
            <h3>라이브 경매</h3>
            <Link href="/liveauction">전체 경매보기</Link>
          </div>
        </section>
      )}
      <section className={S.section}>
        <div className={S.title}>
          <h3>일반 경매</h3>
          <Link className={S.link} href="/basicauction">
            전체 경매보기
            <ArrowRightIcon />
          </Link>
        </div>
        <ListLayout>
          {data.result_data.content.map(item => (
            <AuctionCard
              key={item.auction_id}
              id={item.auction_id}
              image={item.image_keys}
              title={item.title}
              isLike={false}
              startPrice={item.start_price}
              startTime={item.start_date}
              endTime={item.end_date}
            />
          ))}
        </ListLayout>
      </section>
      {/* 특정 유저의 상품 모아 놓기(필수 아님) */}
      <section className={S.section}>
        <div className={S.title}>
          <h3>000 판매자</h3>
        </div>
      </section>
    </div>
  );
}
