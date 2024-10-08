import Link from 'next/link';

import { AuctionListResponse } from '@/apis/types/basicAuction';
import ArrowRightIcon from '@/assets/svg/arrow-right.svg';
import AuctionCard from '@/components/AuctionCard';
import ListLayout from '@/components/ListLayout';

import * as S from './AuctionList.css';

export interface AunctionList {
  data: AuctionListResponse;
  isLink?: boolean;
  path?: string;
  pathname: string;
}

export default function AuctionList({ data, isLink = false, path = '', pathname }: AunctionList) {
  return (
    <section className={S.section}>
      <div className={S.title}>
        <h3>{pathname}</h3>
        {isLink ? (
          <Link className={S.link} href={path}>
            경매 전체보기
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>
      <ListLayout>
        {data.result_data.content.map(item => (
          <AuctionCard
            key={item.auction_id}
            id={item.auction_id}
            image={item.image_keys}
            title={item.title}
            isLike={false}
            startPrice={item.start_price}
            startTime={item.start_date}
            endTime={item.end_date}
          />
        ))}
      </ListLayout>
    </section>
  );
}

AuctionList.defaultProps = {
  isLink: false,
  path: '',
};