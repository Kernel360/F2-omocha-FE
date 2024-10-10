export const SEARCHPARAM_KEY = {
  SORT: 'sort',
  Q: 'q',
};

export const SORT_VALUE = {
  CREATEDAT_DESC: 'createdAt,DESC',
  CREATEDAT_ASC: 'createdAt,ASC',
  STARTDATE_ASC: 'startDate,ASC',
  ENDDATE_DESC: 'endDate,DESC',
};

export const SORT_TYPES = [
  {
    id: 1,
    label: '최신순',
    searchParamKey: SEARCHPARAM_KEY.SORT,
    searchParamValue: SORT_VALUE.CREATEDAT_DESC,
  },
  {
    id: 2,
    label: '오래된순',
    searchParamKey: SEARCHPARAM_KEY.SORT,
    searchParamValue: SORT_VALUE.CREATEDAT_ASC,
  },
];
