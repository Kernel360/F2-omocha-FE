import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBasicAuctionBid } from '@/apis/queryFunctions/basicAuction';
import { PostBasicAuctionBidParams } from '@/apis/types/basicAuction';

function usePostBasicAuctionBid() {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: ({ id, params }: { id: number; params: PostBasicAuctionBidParams }) =>
      postBasicAuctionBid(id, params),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: ['basicAuction', params.id] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
      queryClient.invalidateQueries({ queryKey: ['basicAuctionBidList', params.id] });
    },
    onError: () => {
      console.log('bid 실패');
    },
  });

  return { mutate, error };
}

export default usePostBasicAuctionBid;
