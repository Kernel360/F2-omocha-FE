import { AUCTIONPARAM_KEY, AUCTIONPARAM_VALUE } from '@/static/queryParam';

export interface SortTypeProps {
  id: number;
  label: string;
  searchParams: {
    [x: string]: string;
  };
}

export const SORT_TYPES: SortTypeProps[] = [
  {
    id: 1,
    label: '현재가 높은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.NOWPRICE,
      [AUCTIONPARAM_KEY.DIRECTION]: 'DESC',
    },
  },
  {
    id: 2,
    label: '현재가 낮은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.NOWPRICE,
      [AUCTIONPARAM_KEY.DIRECTION]: 'ASC',
    },
  },
  {
    id: 3,
    label: '입찰 기록 많은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.BIDCOUNT,
      [AUCTIONPARAM_KEY.DIRECTION]: 'DESC',
    },
  },
  {
    id: 4,
    label: '입찰 기록 적은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.BIDCOUNT,
      [AUCTIONPARAM_KEY.DIRECTION]: 'ASC',
    },
  },
];
