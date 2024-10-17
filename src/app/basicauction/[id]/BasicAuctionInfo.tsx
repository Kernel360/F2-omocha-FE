'use client';

import React from 'react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import BasicAuctionInfoContent from '@/app/basicauction/[id]/BasicAuctionInfoContent';
import AuctionImageInfo from '@/components/AuctionImageInfo';
import AuctionInfo from '@/components/AuctionInfo';
import TabsLayout from '@/components/TabsLayout';
import useUserStore from '@/store/useUserStore';

import * as S from './BasicAuctionInfo.css';
import BasicAuctionInfoQNA from './BasicAuctionInfoQNA';

interface BasicAuctionInfoProps {
  id: number;
}
const TABS = [
  {
    title: '상품 정보',
    value: 'productInfo',
  },
  {
    title: '상품 문의',
    value: 'productInquiry',
  },
];

function BasicAuctionInfo({ id }: BasicAuctionInfoProps) {
  const { data } = useGetBasicAuction(id);
  const user = useUserStore(state => state.user);

  if (!data) return null;

  const sellerId = data.result_data.seller_id;
  const userId = user?.member_id;
  const userEmail = user?.email;
  const isSeller = sellerId === userId;

  return (
    <div>
      <div className={S.auctionInfoWrapper}>
        <AuctionImageInfo imageList={data.result_data.image_keys} />
        <AuctionInfo
          id={id}
          title={data.result_data.title}
          startPrice={data.result_data.start_price}
          nowPrice={data.result_data.now_price}
          endTime={data.result_data.end_date}
          bidCount={data.result_data.bid_count}
          bidUnit={data.result_data.bid_unit}
          sellerId={data.result_data.seller_id}
        />
      </div>
      <TabsLayout
        defaultTriggerValue={TABS[0].value}
        triggerTitleList={TABS}
        childrenList={[
          <BasicAuctionInfoContent key="productInfo" id={id} content={data.result_data.content} />,
          <BasicAuctionInfoQNA
            key="productInquiry"
            id={id}
            userEmail={userEmail}
            isSeller={isSeller}
          />,
        ]}
      />
    </div>
  );
}

export default BasicAuctionInfo;
