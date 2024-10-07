import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuctionQueryFn';
import { GetBasicAuctionListParams } from '@/apis/types/Auction';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const { data } = useQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionList(params),
  });
  return { data };
}

export default useGetBasicAuctionList;
