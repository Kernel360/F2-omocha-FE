export const SEARCHPARAM_KEY = {
  DIRECTION: 'direction',
  AUCTIONSTATUS: 'auctionStatus',
  SORT: 'sort',
  Q: 'q',
};

export const SEARCHPARAM_VALUE = {
  CREATEDAT: 'createdAt',
  STARTDATE: 'startDate',
  ENDDATE: 'endDate',
  STARTPRICE: 'startPrice', // 현재 500
  NOWPRICE: 'nowPrice', // 현재 500
};

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
      [SEARCHPARAM_KEY.SORT]: SEARCHPARAM_VALUE.CREATEDAT,
      [SEARCHPARAM_KEY.DIRECTION]: 'DESC',
    },
  },
  {
    id: 2,
    label: '오래된순',
    searchParams: {
      [SEARCHPARAM_KEY.SORT]: SEARCHPARAM_VALUE.CREATEDAT,
      [SEARCHPARAM_KEY.DIRECTION]: 'ASC',
    },
  },
];
