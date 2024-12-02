import Stars from 'react-stars';

import Image from 'next/image';

import { ReceivedReview } from '@/apis/types/review';

import * as S from './ReviewSection.css';
import { ChevronRightIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ReviewUnitProps {
  review: ReceivedReview;
}

function ReviewUnit({ review }: ReviewUnitProps) {
  const router = useRouter();

  return (
    <div className={S.list}>
      <Image
        className={S.image}
        src={`${process.env.NEXT_PUBLIC_S3_URL}${review.thumbnail_path}`}
        width={120}
        height={120}
        alt="경매 사진"
      />
      <div className={S.InfoWrapper}>
        <li className={`${S.listFirst} ${S.listData}`}>
          <button
            type="button"
            onClick={() => router.push(`/basicauction/${review.auction_id}`, { scroll: false })}
            className={S.bidTitle}
          >
            <span>{review.auction_title}</span>
            <ChevronRightIcon size={14} />
          </button>
        </li>
        <div className={S.flexWrapper}>
          <div className={S.memberNickname}>{review.recipient_member_nickname}</div>
          <Stars count={5} size={16} color2="#ffd700" value={review.rating} half={false} />
        </div>
        <div className={S.createdAt}>{review.create_at}</div>
        <div className={S.reviewContent}>{review.content}</div>
      </div>
    </div>
  );
}

export default ReviewUnit;
