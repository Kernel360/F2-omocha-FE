import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionListQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';

function useGetBasicAuctionList() {
  const { data } = useQuery({
    queryKey: ['basicAuctionList'],
    queryFn: () => getBasicAuctionListQueryFn(),
  });
  return { data };
}

export default useGetBasicAuctionList;
