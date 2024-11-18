import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import { Category, TransformCategoriesToOptions } from '@/apis/types/category';

interface UseGetCategoryParams {
  targetCategoryId?: number;
  categoryType?: string;
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

const transformCategoriesToOptions = (categories: Category[]): TransformCategoriesToOptions[] => {
  return categories.map(category => ({
    value: category.category_id.toString(),
    label: category.name,
    children: category.sub_categories.length
      ? transformCategoriesToOptions(category.sub_categories)
      : undefined,
  }));
};

function useGetCategory({ targetCategoryId, categoryType }: UseGetCategoryParams) {
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

  if (data && categoryType === 'create') {
    return { data: transformCategoriesToOptions(data?.result_data) };
  }

  return { data: data?.result_data };
}

export default useGetCategory;
