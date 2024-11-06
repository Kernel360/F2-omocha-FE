import { useSuspenseQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const { data } = useSuspenseQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionList(params),
  });

  return { data };
}

export default useGetBasicAuctionList;
