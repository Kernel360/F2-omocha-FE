import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import filteredParams from '@/utils/filteredParams';
import { useCookies } from '@/provider/cookiesProvider';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const newParams = filteredParams<GetBasicAuctionListParams>(params);
  const { clientToken } = useCookies();

  const { data } = useQuery({
    queryKey: ['basicAuctionList', newParams],
    queryFn: () => getBasicAuctionList(newParams, clientToken),
  });

  const pageInfo = {
    lastPage: data?.result_data.total_pages || 0,
    currentPage: data?.result_data.number || 0,
  };

  return { data, pageInfo };
}

export default useGetBasicAuctionList;
