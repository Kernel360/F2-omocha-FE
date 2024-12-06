'use client';

import AuctionList from '@/components/AuctionList';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import MainCarousel from '@/components/MainCarousel';
import MaxLayout from '@/components/MaxLayout';
import SpecialSection from '@/components/SpecialSection';
import EVENT_ID from '@/static/eventId';

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
          eventId={EVENT_ID.VIEW_ALL_NEW_AUCTION_ITEMS_BUTTON_CLICKED}
        />
        <AuctionList
          sort="endDate"
          direction="ASC"
          path="/basicauction?page=1&sort=endDate&direction=ASC"
          pathname="마감 임박 상품"
          eventId={EVENT_ID.VIEW_ALL_CLOSING_SOON_AUCTION_ITEMS_BUTTON_CLICKED}
        />
      </MaxLayout>
      <ClientSidePageRef eventId={EVENT_ID.MAIN_PAGE_VIEWED} />
    </div>
  );
}
