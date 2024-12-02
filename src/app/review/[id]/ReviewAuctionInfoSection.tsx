'use client';

import Image from 'next/image';
import Link from 'next/link';

import useGetBasicAuction from '@/apis/queryHooks/basicAuction/useGetBasicAuction';

import * as S from './reviewpage.css';

function ReviewAuctionInfoSection({ id }: { id: number }) {
  const { data } = useGetBasicAuction(Number(id));

  if (!data) return null;

  return (
    <div className={S.auctionInfoWrapper}>
      <Link target="_blank" href={`/basicauction/${data.result_data.auction_id}`} scroll={false}>
        <div className={S.infoTotalWrapper}>
          <Image
            src={`${process.env.NEXT_PUBLIC_S3_URL}${data.result_data.thumbnail_path}`}
            alt="상품 이미지"
            width={80}
            height={80}
          />
          <div className={S.infosWrapper}>
            <div className={S.infoRow}>
              <span className={S.auctionInfoTitle}>상품명:</span>
              <span className={S.auctionInfo}>{data.result_data.title}</span>
            </div>
            <div className={S.infoRow}>
              <span className={S.auctionInfoTitle}>구매가:</span>
              <span className={S.auctionInfo}>
                {data.result_data.now_price
                  ? data.result_data.now_price.toLocaleString('ko-kr')
                  : ''}
                원
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ReviewAuctionInfoSection;
