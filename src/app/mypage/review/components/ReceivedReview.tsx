'use client';

import { useRouter } from 'next/navigation';

import useGetReceivedReview from '@/apis/queryHooks/review/useGetReceivedReviews';

import * as S from './ReviewSection.css';
import ReviewUnit from './ReviewUnit';

function ReceivedReview() {
  const router = useRouter();

  const { data: receivedReviews } = useGetReceivedReview();

  if (!receivedReviews) {
    return null;
  }

  return (
    <ul className={S.sectionWrapper}>
      {receivedReviews.result_data.content.length === 0 ? (
        <div className={S.noListWrapper}>
          <div className={S.noListTitle}>
            아직 받은 리뷰가 없습니다.
            <br />
            다양한 경매에 참여하고 리뷰를 받아보세요.
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
        receivedReviews.result_data.content.map(receivedReview => (
          <div key={receivedReview.auction_id} className={S.listWrapper}>
            <ReviewUnit review={receivedReview} />
          </div>
        ))
      )}
    </ul>
  );
}

export default ReceivedReview;
