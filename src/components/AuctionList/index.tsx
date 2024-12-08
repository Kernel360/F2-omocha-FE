'use client';

import { Suspense } from 'react';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

// import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
// import AuctionCard from '@/components/AuctionCard';
// import ListLayout from '@/components/ListLayout';
// import { useAuth } from '@/provider/authProvider';

import AuctionCardList from './AuctionCardList';
import * as S from './AuctionList.css';

export interface AuctionListProps {
  sort: string;
  direction: string;
  title: string;
  path: string;
}

export default function AuctionList({ sort, direction, title, path }: AuctionListProps) {
  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{title}</h3>
        <Link className={S.link} href={path}>
          경매 전체보기
          <ArrowRightIcon />
        </Link>
      </div>
      <Suspense fallback={<>Loading...</>}>
        <AuctionCardList sort={sort} direction={direction} />
      </Suspense>
    </section>
  );
}
