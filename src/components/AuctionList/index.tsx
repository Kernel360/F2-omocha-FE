'use client';

import { Suspense } from 'react';

import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
// import AuctionCard from '@/components/AuctionCard';
// import ListLayout from '@/components/ListLayout';
// import { useAuth } from '@/provider/authProvider';
import mixpanel from '@/lib/mixpanel';

import AuctionCardList from './AuctionCardList';
import * as S from './AuctionList.css';

export interface AuctionListProps {
  sort: string;
  direction: string;
  title: string;
  path: string;
  eventId: string;
}

export default function AuctionList({ sort, direction, title, path, eventId }: AuctionListProps) {
  const handleMixpanel = () => {
    mixpanel.track(eventId);
  };
  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{title}</h3>
        <Link className={S.link} href={path} onClick={handleMixpanel}>
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
