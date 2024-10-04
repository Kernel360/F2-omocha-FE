'use client';

import React from 'react';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';
import AuctionInfo from '@/components/AuctionInfo';

interface TestProps {
  id: number;
}

function BasicAuctionInfo({ id }: TestProps) {
  const { data } = useGetBasicAuction(id);

  if (!data) return null;

  return (
    <AuctionInfo
      title={data.result_data.title}
      startPrice={data.result_data.start_price}
      nowPrice={data.result_data.now_price}
      endTime={data.result_data.end_date}
      bidCount={0}
    />
  );
}

export default BasicAuctionInfo;
