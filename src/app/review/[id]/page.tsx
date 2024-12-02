'use client';

import React, { useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import usePostReview from '@/apis/queryHooks/review/usePostReview';
import CommonButton from '@/components/CommonButton';

import ReviewAuctionInfoSection from './ReviewAuctionInfoSection';
import StarRating from './StarRating';
import * as S from './reviewpage.css';

interface ReviewPageProps {
  params: { id: string };
}

export default function ReviewPage({ params }: ReviewPageProps) {
  const { mutate } = usePostReview();
  const { id } = params;

  const router = useRouter(); // useRouter 추가
  const searchParams = useSearchParams();
  const reviewType = searchParams.get('review_type');

  const [rating, setRating] = useState(0);

  const [reviewContent, setReviewContent] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // 기본 동작 방지

    if (!reviewContent.trim()) {
      alert('리뷰 내용을 입력해주세요.');
      return;
    }

    if (reviewType === null) {
      alert('올바르지 못한 접근입니다.');
      return;
    }

    mutate(
      {
        id: Number(id),
        params: {
          review_type: reviewType,
          rating,
          content: reviewContent,
        },
      },
      {
        onSuccess: () => {
          if (window.opener) {
            setTimeout(() => {
              window.close();
            }, 2000);
          } else {
            router.back();
          }
        },
      },
    );
  };

  return (
    <form className={S.container} onSubmit={handleSubmit}>
      <h1 className={S.title}>리뷰 작성</h1>
      <ReviewAuctionInfoSection id={Number(id)} />
      <StarRating setRating={setRating} />
      <textarea
        value={reviewContent}
        onChange={e => setReviewContent(e.target.value)}
        placeholder="리뷰를 작성하세요."
        style={{ width: '100%', height: '150px' }}
      />
      <CommonButton type="submit" content="리뷰 남기기" />
    </form>
  );
}
