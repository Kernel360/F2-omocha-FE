'use client';

import { useRouter } from 'next/navigation';

import useGetAuctionLikeList from '@/apis/queryHooks/User/useGetAuctionLikeList';
import useGetUser from '@/apis/queryHooks/User/useGetUser';
import AuctionCard from '@/components/AuctionCard';
import ClientSidePageRef from '@/components/ClientPageTrackingPageView';
import ListLayout from '@/components/ListLayout';
import CardListSkeleton from '@/components/Skeleton/CardListSkeleton';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import useRequireAuth from '@/hooks/useRequireAuth';
import EVENT_ID from '@/static/eventId';

import * as S from './Heart.css';

function Home() {
  const { isCheckingAuth } = useRequireAuth();

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

  if (isCheckingAuth) {
    return null;
  }

  if (isLoading)
    return (
      <div className={S.heart}>
        <h3>찜 목록 ({user?.like_count ? user.like_count : 0})</h3>
        <CardListSkeleton count={4} />
      </div>
    );

  return (
    <div className={S.heart}>
      <h3>찜 목록 ({user?.like_count ? user.like_count : 0})</h3>
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
                  categoryId={item.category_id}
                />
              )),
            )}
          </ListLayout>
          {isFetchingNextPage && hasNextPage && <CardListSkeleton count={4} />}
          <div ref={endCursorRef} />
          <ClientSidePageRef eventId={EVENT_ID.MYPAGE_HEART_PAGE_VIEWED} />
        </>
      )}
    </div>
  );
}

export default Home;
