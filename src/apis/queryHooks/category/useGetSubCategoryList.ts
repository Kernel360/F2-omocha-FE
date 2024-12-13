import { useQuery } from '@tanstack/react-query';

import { getSubCategoryList } from '@/apis/queryFunctions/category';
import { Category } from '@/apis/types/category';

function checkSubCategory(category: Category): { name: string; category_id: number }[] {
  const res: { name: string; category_id: number }[] = [
    { name: category.name, category_id: category.category_id },
  ];

  category.sub_categories.forEach(subCategory => {
    res.push(...checkSubCategory(subCategory));
  });

  return res;
}

function useGetSubCategoryList(id: number | null) {
  const { data } = useQuery({
    queryKey: ['category', id],
    queryFn: () => getSubCategoryList(id!),
    enabled: id !== null,
  });

  const response = data?.result_data.flatMap(category => checkSubCategory(category));

  return { data: response };
}

export default useGetSubCategoryList;
