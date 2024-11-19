import { useSuspenseQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  );

  const { data } = useSuspenseQuery({
    queryKey: ['basicAuctionList', filteredParams],
    queryFn: () => getBasicAuctionList(filteredParams),
  });

  return { data };
}

export default useGetBasicAuctionList;
