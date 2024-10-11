'use client';

import React from 'react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import AuctionInfo from '@/components/AuctionInfo';

interface BasicAuctionInfoProps {
  id: number;
}

function BasicAuctionInfo({ id }: BasicAuctionInfoProps) {
  const { data } = useGetBasicAuction(id);

  if (!data) return null;

  return (
    <AuctionInfo
      id={id}
      title={data.result_data.title}
      startPrice={data.result_data.start_price}
      nowPrice={data.result_data.now_price}
      endTime={data.result_data.end_date}
      bidCount={data.result_data.bid_count}
      bidUnit={data.result_data.bid_unit}
    />
  );
}

export default BasicAuctionInfo;
