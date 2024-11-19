import { useSuspenseQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import filteredParams from '@/utils/filteredParams';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const newParams = filteredParams<GetBasicAuctionListParams>(params);

  const { data } = useSuspenseQuery({
    queryKey: ['basicAuctionList', newParams],
    queryFn: () => getBasicAuctionList(newParams),
  });

  return { data };
}

export default useGetBasicAuctionList;
