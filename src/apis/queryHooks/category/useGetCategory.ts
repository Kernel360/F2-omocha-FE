import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import { Category } from '@/apis/types/category';

interface UseGetCategoryParams {
  targetCategoryId?: number;
}

function addIsOpenProperty(
  targetCategoryId: number,
  category: Category,
): Category & { isOpen: boolean } {
  if (category.category_id === targetCategoryId) {
    return { ...category, isOpen: true };
  }

  let isOpen = false;
  const updatedSubCategory = category.sub_categories.map(subCategory => {
    const subAddIsOpen = addIsOpenProperty(targetCategoryId, subCategory);
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
    const addIsOpenPropertyData = data.result_data.map(category =>
      addIsOpenProperty(targetCategoryId, category),
    );

    return { data: addIsOpenPropertyData };
  }

  return { data: data?.result_data };
}

export default useGetCategory;
