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
    label: '최신순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.CREATEDAT,
      [AUCTIONPARAM_KEY.DIRECTION]: 'DESC',
    },
  },
  {
    id: 2,
    label: '오래된순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.CREATEDAT,
      [AUCTIONPARAM_KEY.DIRECTION]: 'ASC',
    },
  },
  {
    id: 3,
    label: '시작가 높은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.STARTPRICE,
      [AUCTIONPARAM_KEY.DIRECTION]: 'DESC',
    },
  },
  {
    id: 4,
    label: '시작가 낮은순',
    searchParams: {
      [AUCTIONPARAM_KEY.SORT]: AUCTIONPARAM_VALUE.STARTPRICE,
      [AUCTIONPARAM_KEY.DIRECTION]: 'ASC',
    },
  },
];
