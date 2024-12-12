import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import { Category } from '@/apis/types/category';

function checkSubCategory(targetCategoryId: number, category: Category): Category[] {
  if (category.category_id === targetCategoryId) {
    return category.sub_categories;
  }

  const updatedSubCategory = category.sub_categories.map(subCategory => {
    const isSubcategory = checkSubCategory(targetCategoryId, subCategory);
    return isSubcategory;
  });

  return updatedSubCategory.flat();
}

function useGetSubCategory(pickedCategoryId: number) {
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
    enabled: pickedCategoryId !== 0,
  });

  if (!data) return { data: [] as Category[] };

  const checkedSubCategoryData = data.result_data
    .map(category => checkSubCategory(pickedCategoryId, category))
    .flat();

  return { data: checkedSubCategoryData };
}

export default useGetSubCategory;
