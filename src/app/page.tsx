'use client';

import AuctionList from '@/components/AuctionList';
import MainCarousel from '@/components/MainCarousel';
import MaxLayout from '@/components/MaxLayout';
import SpecialSection from '@/components/SpecialSection';

export default function Home() {
  return (
    <div>
      <MainCarousel />
      <SpecialSection />
      <MaxLayout>
        <AuctionList
          sort="createdAt"
          direction="DESC"
          path="/basicauction?page=1"
          pathname="신규 경매 상품"
        />
        <AuctionList
          sort="endDate"
          direction="ASC"
          path="/basicauction?page=1"
          pathname="마감 임박 상품"
        />
        {/* 특정 유저의 상품 모아 놓기(필수 아님) */}
        {/* <AuctionList data={data} pathname="000 판매자" />  */}
      </MaxLayout>
    </div>
  );
}
