'use client';

import React from 'react';

import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';
import AuctionInfo from '@/components/AuctionInfo';

interface TestProps {
  id: number;
}

function BasicAuctionInfo({ id }: TestProps) {
  const { data } = useQuery({
    queryKey: ['basicAuction', id],
    queryFn: () => getBasicAuctionQueryFn(id),
  });

  if (!data) return null;

  return (
    <AuctionInfo
      title={data.title}
      startPrice={data.start_price}
      nowPrice={data.now_price}
      endTime={data.end_date}
      bidCount={0}
    />
  );
}

export default BasicAuctionInfo;
