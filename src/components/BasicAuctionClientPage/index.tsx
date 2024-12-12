/* eslint-disable react/no-array-index-key */

'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import useGetBasicAuctionList from '@/apis/queryHooks/basicAuction/useGetBasicAuctionList';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';
import Pagination from '@/components/Pagination';
import { AUCTIONPARAM_KEY } from '@/static/queryParam';

import SkeletonCard from '../Skeleton/components/SkeletonCard';
import SkeletonText from '../Skeleton/components/SkeletonText';

import * as S from './BasicAuctionClientPage.css';

function BasicAuctionClientPage() {
  const searchParams = useSearchParams();
  const searchKeywordParam = searchParams.get(AUCTIONPARAM_KEY.Q);
  const pickCategory = Number(searchParams.get('categoryId'));
  const currentPage = Number(searchParams.get('page'));
  const router = useRouter();

  const { data, pageInfo, isLoading } = useGetBasicAuctionList({
    categoryId: pickCategory || undefined,
    title: searchKeywordParam || undefined,
    auctionStatus: searchParams.get(AUCTIONPARAM_KEY.AUCTIONSTATUS) || undefined,
    sort: searchParams.get(AUCTIONPARAM_KEY.SORT) || undefined,
    direction: searchParams.get(AUCTIONPARAM_KEY.DIRECTION) || undefined,
    size: 20, // 사이즈 2로 ALL 에서 검토
    page: Math.max(currentPage - 1, 0),
  });

  if (isLoading || !data) {
    return (
      <div className={S.container}>
        <div className={S.searchContainer}>
          <div className={S.count}>
            <span>전체</span>
            <span>00</span>
          </div>
        </div>
        <div className={S.listLayoutWrapper}>
          <ListLayout>
            {Array.from({ length: 9 }).map((_, index) => (
              <div key={index} className={S.cardContainer}>
                <SkeletonCard width={186} height={196} />
                <div className={S.textContainer}>
                  <SkeletonText noOfLines={2} gap={8} />
                </div>
              </div>
            ))}
          </ListLayout>
        </div>
        {/* {data.result_data.number_of_elements !== 0 && <Pagination pageInfo={pageInfo} />} */}
      </div>
    );
  }

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
            ))}
          </ListLayout>
        )}
      </div>
      {data.result_data.number_of_elements !== 0 && <Pagination pageInfo={pageInfo} />}
    </div>
  );
}

export default BasicAuctionClientPage;
