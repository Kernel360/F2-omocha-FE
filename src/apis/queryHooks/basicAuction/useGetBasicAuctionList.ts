import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const { data } = useQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionList(params),
  });
  return { data };
}

export default useGetBasicAuctionList;
