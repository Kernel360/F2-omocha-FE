import { useQuery } from '@tanstack/react-query';

import { getAuctionLikeList } from '@/apis/queryFunctions/User';
import { ListParams } from '@/apis/types/common';

function useGetAuctionLikeList(param: ListParams) {
  const { data } = useQuery({
    queryKey: ['auctionLikeList', param],
    queryFn: () => getAuctionLikeList(param),
  });

  // const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryKey: ['auctionLikeList', param],
  //   queryFn: ({ pageParam }) => getAuctionLikeList({ ...param, page: pageParam }),
  //   initialPageParam: 1,
  //   getNextPageParam: lastPage => {
  //     const { total_pages: totalPages, number } = lastPage.result_data;
  //     if (totalPages > number) return number + 1;
  //     return undefined;
  //   },
  // });

  // return { data, hasNextPage, fetchNextPage, isFetchingNextPage };
  return { data };
}

export default useGetAuctionLikeList;
