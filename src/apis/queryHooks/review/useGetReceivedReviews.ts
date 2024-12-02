import { useQuery } from '@tanstack/react-query';

import { getReceivedReviews } from '@/apis/queryFunctions/review';

function useGetReceivedReview() {
  const { data } = useQuery({
    queryKey: ['receivedReview'],
    queryFn: () => getReceivedReviews(),
  });

  return { data };
}

export default useGetReceivedReview;
