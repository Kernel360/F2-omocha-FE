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
          path="/basicauction?page=1&sort=createdAt&direction=DESC"
          pathname="신규 경매 상품"
        />
        <AuctionList
          sort="endDate"
          direction="ASC"
          path="/basicauction?page=1&sort=endDate&direction=ASC"
          pathname="마감 임박 상품"
        />
      </MaxLayout>
    </div>
  );
}
