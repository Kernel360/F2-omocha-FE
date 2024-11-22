import { useInfiniteQuery } from '@tanstack/react-query';

import { getAuctionLikeList } from '@/apis/queryFunctions/User';
import { ListParams } from '@/apis/types/common';

function useGetAuctionLikeList(params: ListParams) {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['auctionLikeList', params],
    queryFn: ({ pageParam }) => getAuctionLikeList({ ...params, page: pageParam }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      const { total_pages: totalPages, number } = lastPage.result_data;
      if (totalPages > number) return number + 1;
      return undefined;
    },
  });

  return { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading };
}

export default useGetAuctionLikeList;
