'use client';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionList from '@/components/AuctionList';
import MainCarousel from '@/components/MainCarousel';
import MaxLayout from '@/components/MaxLayout';
import SpecialSection from '@/components/SpecialSection';

export default function Home() {
  const { data } = useGetBasicAuctionList({
    title: '',
    sort: 'createdAt',
    direction: 'DESC',
    page: 0,
    size: 4,
  });

  if (!data) return null;

  return (
    <div>
      <MainCarousel />
      <SpecialSection />
      <MaxLayout>
        <AuctionList data={data} pathname="신규 경매 상품" />
        <AuctionList data={data} pathname="마감 임박 상품" />
        <AuctionList data={data} isLink path="/basicauction" pathname="일반 경매" />
        {/* 특정 유저의 상품 모아 놓기(필수 아님) */}
        <AuctionList data={data} pathname="000 판매자" />
      </MaxLayout>
    </div>
  );
}
