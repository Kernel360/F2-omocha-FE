import { useQuery } from '@tanstack/react-query';

import { getCategory } from '@/apis/queryFunctions/category';

function useGetCategory() {
  const { data } = useQuery({
    queryKey: ['category'],
    queryFn: () => getCategory(),
  });

  return { data };
}

export default useGetCategory;
