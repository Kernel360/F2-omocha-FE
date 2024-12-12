import { useInfiniteQuery } from '@tanstack/react-query';

import { getAuctionLikeList } from '@/apis/queryFunctions/User';
import { ListParams } from '@/apis/types/common';
// import { useCookies } from '@/provider/cookiesProvider';
import getAuthTokens from '@/utils/getAuthTokens';

function useGetAuctionLikeList(params: ListParams) {
  // const { clientToken } = useCookies();
  const tokens = getAuthTokens();

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ['auctionLikeList', params],
    queryFn: ({ pageParam }) => getAuctionLikeList({ ...params, page: pageParam }, tokens),
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
