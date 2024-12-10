import { Category } from '@/apis/types/category';

import flattenCategoriesTree from './flattenCategoriesTree';

describe('flattenCategoriesTree', () => {
  it('빈 카테고리 배열에 대해 빈 배열을 반환해야 한다', () => {
    const categories: Category[] = [];
    expect(flattenCategoriesTree(categories)).toEqual([]);
  });

  it('하나의 카테고리만 있는 경우, 해당 카테고리를 반환해야 한다', () => {
    const categories: Category[] = [
      { category_id: 1, name: 'Category 1', parent_id: null, sub_categories: [] },
    ];
    expect(flattenCategoriesTree(categories)).toEqual(categories);
  });

  it('중첩된 카테고리를 평탄화해야 한다', () => {
    const categories: Category[] = [
      {
        category_id: 1,
        name: 'Category 1',
        parent_id: null,
        sub_categories: [
          {
            category_id: 2,
            name: 'Subcategory 1',
            parent_id: 1,
            sub_categories: [
              {
                category_id: 3,
                name: 'Subcategory 1-1',
                parent_id: 2,
                sub_categories: [],
              },
            ],
          },
        ],
      },
    ];

    const expected = [
      {
        category_id: 1,
        name: 'Category 1',
        parent_id: null,
        sub_categories: categories[0].sub_categories,
      },
      {
        category_id: 2,
        name: 'Subcategory 1',
        parent_id: 1,
        sub_categories: categories[0].sub_categories[0].sub_categories,
      },
      { category_id: 3, name: 'Subcategory 1-1', parent_id: 2, sub_categories: [] },
    ];

    expect(flattenCategoriesTree(categories)).toEqual(expected);
  });

  it('다수의 최상위 카테고리와 하위 카테고리를 평탄화해야 한다', () => {
    const categories: Category[] = [
      {
        category_id: 1,
        name: 'Category 1',
        parent_id: null,
        sub_categories: [],
      },
      {
        category_id: 2,
        name: 'Category 2',
        parent_id: null,
        sub_categories: [
          {
            category_id: 3,
            name: 'Subcategory 2-1',
            parent_id: 2,
            sub_categories: [],
          },
        ],
      },
    ];

    const expected = [
      { category_id: 1, name: 'Category 1', parent_id: null, sub_categories: [] },
      {
        category_id: 2,
        name: 'Category 2',
        parent_id: null,
        sub_categories: categories[1].sub_categories,
      },
      { category_id: 3, name: 'Subcategory 2-1', parent_id: 2, sub_categories: [] },
    ];

    expect(flattenCategoriesTree(categories)).toEqual(expected);
  });

  it('isOpen 속성도 제대로 처리해야 한다', () => {
    const categories: Category[] = [
      {
        category_id: 1,
        name: 'Category 1',
        parent_id: null,
        isOpen: true,
        sub_categories: [
          {
            category_id: 2,
            name: 'Subcategory 1',
            parent_id: 1,
            isOpen: false,
            sub_categories: [],
          },
        ],
      },
    ];

    const expected = [
      {
        category_id: 1,
        name: 'Category 1',
        parent_id: null,
        isOpen: true,
        sub_categories: categories[0].sub_categories,
      },
      {
        category_id: 2,
        name: 'Subcategory 1',
        parent_id: 1,
        isOpen: false,
        sub_categories: [],
      },
    ];

    expect(flattenCategoriesTree(categories)).toEqual(expected);
  });
});
