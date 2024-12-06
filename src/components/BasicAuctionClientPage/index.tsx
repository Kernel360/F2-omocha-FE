'use client';

import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import { useAuth } from '@/provider/authProvider';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import Pagination from '../Pagination';

import * as S from './BasicAuctionClientPage.css';

function BasicAuctionClientPage() {
  const searchParams = useSearchParams();
  const searchKeywordParam = searchParams.get(AUCTIONPARAM_KEY.Q);
  const pickCategory = Number(searchParams.get('categoryId'));
  const currentPage = Number(searchParams.get('page'));
  const router = useRouter();

  const { isLoggedIn } = useAuth();

  const { data, pageInfo } = useGetBasicAuctionList({
    categoryId: pickCategory || undefined,
    title: searchKeywordParam || undefined,
    auctionStatus: searchParams.get(AUCTIONPARAM_KEY.AUCTIONSTATUS) || undefined,
    sort: searchParams.get(AUCTIONPARAM_KEY.SORT) || undefined,
    direction: searchParams.get(AUCTIONPARAM_KEY.DIRECTION) || undefined,
    size: 20, // 사이즈 2로 ALL 에서 검토
    page: Math.max(currentPage - 1, 0),
    isLogin: isLoggedIn,
  });

  if (!data) return null;

  return (
    <div className={S.container}>
      <div className={S.searchContainer}>
        <div className={S.count}>
          <span>전체</span>
          <span>{data.result_data.total_elements}</span>
        </div>
      </div>
      <div className={S.listLayoutWrapper}>
        {data.result_data.content.length === 0 ? (
          <div className={S.noListWrapper}>
            <div className={S.noListTitle}>아직 등록된 경매가 없습니다.</div>
            <button
              className={S.noListButton}
              type="button"
              onClick={() => router.push('/create', { scroll: false })}
            >
              경매 등록하러 가기
            </button>
          </div>
        ) : (
          <ListLayout>
            {data.result_data.content.map(item => (
              <Suspense key={item.auction_id} fallback={<>AuctionCard</>}>
                <AuctionCard
                  key={item.auction_id}
                  id={item.auction_id}
                  thumbnailImage={item.thumbnail_path}
                  title={item.title}
                  isLike={item.is_liked}
                  startPrice={item.start_price}
                  startTime={item.start_date}
                  endTime={item.end_date}
                  nowPrice={item.now_price}
                  auctionStatus={item.auction_status}
                  instantBuyPrice={item.instant_buy_price}
                />
              </Suspense>
            ))}
          </ListLayout>
        )}
      </div>
      {data.result_data.number_of_elements !== 0 && <Pagination pageInfo={pageInfo} />}
    </div>
  );
}

export default BasicAuctionClientPage;
