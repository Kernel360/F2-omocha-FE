'use client';

import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import useGetAuctionLikeList from '@/apis/queryHooks/User/useGetAuctionLikeList';
import useGetUser from '@/apis/queryHooks/User/useGetUser';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import CardListSkeleton from '@/components/Skeleton/CardListSkeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useRequireAuth from '@/hooks/useRequireAuth';

import * as S from './Heart.css';

function Home() {
  useRequireAuth();

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
        <CardListSkeleton count={4} />
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
                <Suspense key={item.auction_id} fallback={<>AuctionCard</>}>
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
                </Suspense>
              )),
            )}
          </ListLayout>
          {isFetchingNextPage && hasNextPage && <CardListSkeleton count={4} />}
          <div ref={endCursorRef} />
        </>
      )}
    </div>
  );
}

export default Home;
