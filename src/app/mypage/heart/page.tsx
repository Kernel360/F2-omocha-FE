'use client';

import useGetAuctionLikeList from '@/apis/queryHooks/User/useGetAuctionLikeList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
// import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import * as S from './Heart.css';

function Home() {
  // const { data, hasNextPage, fetchNextPage } = useGetAuctionLikeList({
  //   page: 0,
  //   size: 4,
  //   sort: 'createdAt',
  // });
  const { data } = useGetAuctionLikeList({
    page: 0,
    size: 20,
    sort: 'createdAt',
  });

  // const { endCursorRef } = useIntersectionObserver({
  //   hasNextPage,
  //   fetchNextPage,
  // });

  // if (!data) return null;

  return (
    <div className={S.heart}>
      <h3>찜 목록</h3>
      <ListLayout>
        {data?.result_data.content.map(item => (
          <AuctionCard
            key={item.auction_id}
            id={item.auction_id}
            thumbnailImage={item.thumbnail_path}
            title={item.title}
            isLike={!!item.liked_date}
            startPrice={item.start_price}
            startTime={item.start_date}
            endTime={item.end_date}
            nowPrice={item.now_price}
          />
        ))}
        {/* {data?.pages.map(page =>
          page.result_data.content.map(item => (
            <AuctionCard
              key={item.auction_id}
              id={item.auction_id}
              thumbnailImage={item.thumbnail_path}
              title={item.title}
              isLike={!!item.liked_date}
              startPrice={item.start_price}
              startTime={item.start_date}
              endTime={item.end_date}
              nowPrice={item.now_price}
            />
          )),
        )} */}
      </ListLayout>
      {/* <div ref={endCursorRef} /> */}
    </div>
  );
}

export default Home;
