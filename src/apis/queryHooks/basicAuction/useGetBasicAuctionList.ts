import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionListQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';
import { GetBasicAuctionListQueryFnProps } from '@/apis/types/Auction';

function useGetBasicAuctionList(params: GetBasicAuctionListQueryFnProps) {
  const { data } = useQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionListQueryFn(params),
  });
  return { data };
}

export default useGetBasicAuctionList;
