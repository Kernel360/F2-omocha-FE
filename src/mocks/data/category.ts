export const category = [
  {
    category_id: 1,
    name: '영화',
    parent_id: null,
    sub_categories: [
      {
        category_id: 2,
        name: '해리포터',
        parent_id: 1,
        sub_categories: [
          {
            category_id: 3,
            name: '해리포터 아즈카반의 죄수',
            parent_id: 2,
            sub_categories: [],
          },
        ],
      },
    ],
  },
  {
    category_id: 4,
    name: '애니',
    parent_id: null,
    sub_categories: [
      {
        category_id: 5,
        name: '귀칼',
        parent_id: 4,
        sub_categories: [
          {
            category_id: 6,
            name: '귀칼극장',
            parent_id: 5,
            sub_categories: [],
          },
        ],
      },
    ],
  },
  {
    category_id: 7,
    name: '아이돌',
    parent_id: null,
    sub_categories: [
      {
        category_id: 8,
        name: 'jyp',
        parent_id: 7,
        sub_categories: [
          {
            category_id: 9,
            name: '데이식스',
            parent_id: 8,
            sub_categories: [],
          },
        ],
      },
      {
        category_id: 10,
        name: 'sm',
        parent_id: 7,
        sub_categories: [
          {
            category_id: 12,
            name: '소녀시대',
            parent_id: 10,
            sub_categories: [],
          },
          {
            category_id: 11,
            name: '에스파',
            parent_id: 10,
            sub_categories: [],
          },
          {
            category_id: 13,
            name: '레드벨벳',
            parent_id: 10,
            sub_categories: [],
          },
        ],
      },
    ],
  },
];
