'use client';

import React, { Suspense } from 'react';

import useGetUser from '@/apis/queryHooks/User/useGetUser';
import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import BasicAuctionInfoQnA from '@/app/basicauction/[id]/BasicAuctionInfoQnA';
import AuctionImageInfo from '@/components/AuctionImageInfo';
import AuctionInfo from '@/components/AuctionInfo';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import TabsLayout from '@/components/TabsLayout';
import EVENT_ID from '@/static/eventId';

import * as S from './BasicAuctionInfo.css';
import BasicAuctionInfoContent from './BasicAuctionInfoContent';

interface BasicAuctionInfoProps {
  id: number;
}
const TABS = [
  {
    title: '경매 정보',
    value: 'productInfo',
  },
  {
    title: '경매 문의',
    value: 'productInquiry',
  },
];

function BasicAuctionInfo({ id }: BasicAuctionInfoProps) {
  const { data } = useGetBasicAuction(id);

  const user = useGetUser();

  if (!data) return null;

  const sellerId = data.result_data.member_id;
  const userId = user.data?.member_id;
  const userEmail = user.data?.email;
  const isSeller = sellerId === userId;

  return (
    <div className={S.auctionWrapper}>
      <Suspense fallback={<>Loading...</>}>
        <BreadcrumbSection />
      </Suspense>
      <div className={S.auctionInfoWrapper}>
        <AuctionImageInfo imageList={data.result_data.image_paths} />
        <AuctionInfo
          id={id}
          title={data.result_data.title}
          startPrice={data.result_data.start_price}
          nowPrice={data.result_data.now_price}
          endTime={data.result_data.end_date}
          bidCount={data.result_data.bid_count}
          bidUnit={data.result_data.bid_unit}
          sellerId={data.result_data.member_id}
          instantBuyPrice={data.result_data.instant_buy_price}
          auctionStatus={data.result_data.auction_status}
        />
      </div>
      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={[
          <BasicAuctionInfoContent key="productInfo" content={data.result_data.content} />,
          <BasicAuctionInfoQnA
            key="productInquiry"
            id={id}
            userId={userId}
            userEmail={userEmail}
            isSeller={isSeller}
          />,
        ]}
      />
      <ClientSidePageRef eventId={EVENT_ID.AUCTION_DETAIL_PAGE_VIEWED} />
    </div>
  );
}

export default BasicAuctionInfo;
