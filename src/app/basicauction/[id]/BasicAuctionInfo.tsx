'use client';

import React from 'react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import AuctionImageInfo from '@/components/AuctionImageInfo';
import AuctionInfo from '@/components/AuctionInfo';

import * as S from './BasicAuctionInfo.css';

interface BasicAuctionInfoProps {
  id: number;
}

function BasicAuctionInfo({ id }: BasicAuctionInfoProps) {
  const { data } = useGetBasicAuction(id);

  if (!data) return null;

  return (
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
      />
    </div>
  );
}

export default BasicAuctionInfo;
