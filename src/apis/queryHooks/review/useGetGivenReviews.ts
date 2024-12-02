import { useQuery } from '@tanstack/react-query';

import { getGivenReviews } from '@/apis/queryFunctions/review';

function useGetGivenReviews() {
  const { data } = useQuery({
    queryKey: ['givenReviews'],
    queryFn: () => getGivenReviews(),
  });

  return { data };
}

export default useGetGivenReviews;
