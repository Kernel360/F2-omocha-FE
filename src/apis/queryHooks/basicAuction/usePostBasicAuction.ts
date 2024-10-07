import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { PostBasicAuctionParams } from '@/apis/types/basicAuction';

function usePostBasicAuction() {
  const queryClinet = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (param: PostBasicAuctionParams) => postBasicAuction(param),
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ['basicAuctionList'] });
    },
  });

  return { mutate, error };
}

export default usePostBasicAuction;
