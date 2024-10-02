import { useQuery } from '@tanstack/react-query';

import { getBasicAuctionListQueryFn } from '@/apis/queryFunctions/basicAuctionQueryFn';

export interface GetBasicAuctionListQueryFnProps {
  searchKeyword?: string;
  sort?: string;
}

function useGetBasicAuctionList(params?: GetBasicAuctionListQueryFnProps) {
  console.log('searchKeyword', params);
  const { data } = useQuery({
    queryKey: ['basicAuctionList', params],
    queryFn: () => getBasicAuctionListQueryFn(params),
  });
  return { data };
}

export default useGetBasicAuctionList;
