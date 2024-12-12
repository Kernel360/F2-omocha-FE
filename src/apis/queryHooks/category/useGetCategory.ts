import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';
import { Category } from '@/apis/types/category';

function useGetCategory() {
  const { data, isLoading } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  });

  if (!data) return { data: [] as Category[] };

  return { data: data.result_data as Category[], isLoading };
}

export default useGetCategory;
