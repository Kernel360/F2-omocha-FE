'use client';

import { useRouter } from 'next/navigation';

import useGetGivenReviews from '@/apis/queryHooks/review/useGetGivenReviews';

import * as S from './ReviewSection.css';
import ReviewUnit from './ReviewUnit';

function WrittenReview() {
  const router = useRouter();

  const { data: givenReviews } = useGetGivenReviews();
  if (!givenReviews) {
    return null;
  }

  return (
    <ul className={S.sectionWrapper}>
      {givenReviews.result_data.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>
            아직 남긴 리뷰가 없습니다. <br />
            다양한 경매에 참여하고 리뷰를 남겨보세요.
          </div>
          <button
            className={S.noListButton}
            type="button"
            onClick={() => router.push('/basicauction?page=1', { scroll: false })}
          >
            경매 참여하러 가기
          </button>
        </div>
      ) : (
        givenReviews.result_data.content.map(givenReview => (
          <div key={givenReview.auction_id} className={S.listWrapper}>
            <ReviewUnit review={givenReview} />
          </div>
        ))
      )}
    </ul>
  );
}

export default WrittenReview;
