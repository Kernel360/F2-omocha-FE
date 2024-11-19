import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { AuctionData } from '@/apis/types/basicAuction';
import { ListResponse, Response } from '@/apis/types/common';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

import * as S from './AuctionList.css';

export interface AuctionListProps {
  data: Response<ListResponse<AuctionData[]>>;
  isLink?: boolean;
  path?: string;
  pathname: string;
}

export default function AuctionList({ data, isLink, path = '', pathname }: AuctionListProps) {
  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{pathname}</h3>
        {isLink ? (
          <Link className={S.link} href={path} scroll={false}>
            경매 전체보기
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>
      <div className={S.listWrapper}>
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
            />
          ))}
        </ListLayout>
      </div>
    </section>
  );
}
