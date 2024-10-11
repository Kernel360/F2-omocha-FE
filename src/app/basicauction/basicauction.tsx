'use client';

import { useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionDropDown from '@/app/basicauction/components/auctiondropdown';
import SearchBar from '@/app/basicauction/components/searchbar';
import CheckIcon from '@/assets/svg/check.svg';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import useBooleanState from '@/hooks/useBooleanState';
import useSetSearchParam from '@/hooks/useSetSearchParam';
import { SEARCHPARAM_KEY } from '@/static/sort';

import * as S from './Basicauction.css';

function BasicAuction() {
  const searchParams = useSearchParams();
  const searchKeywordParam = searchParams.get(SEARCHPARAM_KEY.Q);

  const { value: isChecked, toggle } = useBooleanState(false);
  const { setSingleSearchParam } = useSetSearchParam();

  useEffect(() => {
    if (isChecked) {
      setSingleSearchParam(SEARCHPARAM_KEY.AUCTIONSTATUS, 'BIDDING');
    } else {
      setSingleSearchParam(SEARCHPARAM_KEY.AUCTIONSTATUS, '');
    }
  }, [isChecked]);

  const { data } = useGetBasicAuctionList({
    title: searchKeywordParam || '',
    auctionStatus: searchParams.get(SEARCHPARAM_KEY.AUCTIONSTATUS) || '',
    sort: searchParams.get(SEARCHPARAM_KEY.SORT) || '',
    direction: searchParams.get(SEARCHPARAM_KEY.DIRECTION) || '',
    page: 0,
    size: 20,
  });

  if (!data) return null;

  return (
    <div className={S.container}>
      <section className={S.leftSection}>
        <div className={S.count}>
          <span>전체</span>
          <span>{data.result_data.content.length}</span>
        </div>
        <SearchBar />
        <label htmlFor="checkbox" className={`${S.label} ${isChecked ? S.checked : S.nonChecked}`}>
          경매중
          <CheckIcon />
          <input id="checkbox" type="checkbox" className={S.checkbox} onChange={toggle} />
        </label>
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
              nowPrice={item.now_price}
            />
          ))}
        </ListLayout>
      </section>
    </div>
  );
}

export default BasicAuction;
