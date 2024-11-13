import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import { Category } from '@/apis/types/category';

interface UseGetCategoryParams {
  targetCategoryId?: number;
}
// 힘수명 바꾸기

// 1. 카테고리의 2번째(영화 ->로맨스, 스릴러, 액션)부터 탐색
// 3. A함수에서는 category에 id가 targetId와 동일한지 체크 => isopen 속성 true
// 2. category의 sub_categories의 sub_Category가 없을 떄 까지 A함수(category) 반복

function addIsOpen(targetCategoryId: number, category: Category): Category & { isOpen: boolean } {
  if (category.category_id === targetCategoryId) {
    // 최상단에서 본인과 찾고자 하는 것이 같은 경우
    return { ...category, isOpen: true };
  }

  // 하위 요소인 sub를 map돌며 중에 겹치는 것이 있나
  let isOpen = false;
  const updatedSubCategory = category.sub_categories.map(subCategory => {
    const subAddIsOpen = addIsOpen(targetCategoryId, subCategory); // 자식이 함수를 거친 결과
    if (!isOpen && subAddIsOpen.isOpen) {
      isOpen = true;
    }
    return subAddIsOpen;
  });

  return { ...category, sub_categories: updatedSubCategory, isOpen };
}

function useGetCategory({ targetCategoryId }: UseGetCategoryParams) {
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  });

  if (data && targetCategoryId) {
    const newData = data.result_data.map(category => addIsOpen(targetCategoryId, category));

    return { data: newData };
  }

  return { data: data?.result_data };
}

export default useGetCategory;
