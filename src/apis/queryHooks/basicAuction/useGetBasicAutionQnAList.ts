import { useQuery } from '@tanstack/react-query';

import { getAuctionQnAList } from '@/apis/queryFunctions/basicAuction';

function useGetAuctionQnAList(id: number) {
  const { data } = useQuery({
    queryFn: () => getAuctionQnAList(id),
    queryKey: ['auctionQnAList', id],
  });
  return { data };
}

export default useGetAuctionQnAList;
