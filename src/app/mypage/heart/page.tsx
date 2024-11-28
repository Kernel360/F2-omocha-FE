'use client';

import { useRouter } from 'next/navigation';

import useGetAuctionLikeList from '@/apis/queryHooks/User/useGetAuctionLikeList';
import useGetUser from '@/apis/queryHooks/User/useGetUser';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import AuctionListSkeletonUI from '@/components/SkeletonUI/AuctionListSkeletonUI';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

import * as S from './Heart.css';

function Home() {
  const { data: user } = useGetUser();
  const router = useRouter();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useGetAuctionLikeList(
    {
      size: 4,
    },
  );

  const { endCursorRef } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading)
    return (
      <div className={S.heart}>
        <h3>찜 목록 ({user?.like_count})</h3>
        <AuctionListSkeletonUI count={4} />
      </div>
    );

  return (
    <div className={S.heart}>
      <h3>찜 목록 ({user?.like_count})</h3>
      {data?.pages[0].result_data.total_elements === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>아직 찜한 경매가 없습니다.</div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/basicauction?page=1', { scroll: false })}
          >
            경매 구경하러 가기
          </button>
        </div>
      ) : (
        <>
          <ListLayout>
            {data?.pages.map(page =>
              page.result_data.content.map(item => (
                <AuctionCard
                  key={item.auction_id}
                  id={item.auction_id}
                  thumbnailImage={item.thumbnail_path}
                  title={item.title}
                  isLike={!!item.liked_date}
                  auctionStatus={item.auction_status}
                  startPrice={item.start_price}
                  startTime={item.start_date}
                  endTime={item.end_date}
                  nowPrice={item.now_price}
                />
              )),
            )}
          </ListLayout>
          {isFetchingNextPage && hasNextPage && <AuctionListSkeletonUI count={4} />}
          <div ref={endCursorRef} />
        </>
      )}
    </div>
  );
}

export default Home;
