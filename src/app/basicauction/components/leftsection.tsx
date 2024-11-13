'use client';

import { useSearchParams } from 'next/navigation';

import AuctionCategory from '@/components/AuctionCategory';

import * as S from './LeftSection.css';

export default function LeftSection() {
  const searchParams = useSearchParams();
  const pickCategory = searchParams.get('categoryName');

  return (
    <section className={S.leftSection}>
      <div className={S.pickCategory}>{pickCategory || '전체보기'}</div>
      <AuctionCategory />
    </section>
  );
}
