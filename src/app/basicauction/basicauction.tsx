'use client';

import { useSearchParams } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import SearchBar from '@/app/basicauction/components/searchbar';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

import * as S from './Basicauction.css';

function BasicAuction() {
  const searchParams = useSearchParams();
  const searchKeywordParam = searchParams.get('q');

  const { data } = useGetBasicAuctionList({
    title: searchKeywordParam || '',
    sort: [],
    page: 0,
    size: 10,
  });

  if (!data) return null;

  return (
    <div className={S.container}>
      <section className={S.leftSection}>
        <div className={S.count}>
          <span>전체</span>
          <span>10</span>
        </div>
        <SearchBar />
        <AuctionDropDown />
      </section>
      <section className={S.rightSection}>
        <ListLayout>
          {data.result_data.content.map(item => (
            <AuctionCard
              key={item.auction_id}
              id={item.auction_id}
              image={item.image_keys}
              title={item.title}
              isLike={false}
              startPrice={item.start_price}
              startTime={item.start_date}
              endTime={item.end_date}
            />
          ))}
        </ListLayout>
      </section>
    </div>
  );
}

export default BasicAuction;
