import { useQuery } from '@tanstack/react-query';

// import { useCookies } from '@/provider/cookiesProvider';
import { getBasicAuctionList } from '@/apis/queryFunctions/basicAuction';
import { GetBasicAuctionListParams } from '@/apis/types/basicAuction';
import getAuthTokens from '@/utils/getAuthTokens';
import { filteredParams } from '@/utils/paramUtils';

function useGetBasicAuctionList(params: GetBasicAuctionListParams) {
  const newParams = filteredParams<GetBasicAuctionListParams>(params);
  // const { clientToken } = useCookies();
  const tokens = getAuthTokens();

  const { data, isLoading } = useQuery({
    queryKey: ['basicAuctionList', newParams],
    queryFn: () => getBasicAuctionList(newParams, tokens),
  });

  const pageInfo = {
    lastPage: data?.result_data.total_pages || 0,
    currentPage: data?.result_data.number || 0,
  };

  return { data, isLoading, pageInfo };
}

export default useGetBasicAuctionList;
