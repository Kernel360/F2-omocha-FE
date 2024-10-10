import { useMutation, useQueryClient } from '@tanstack/react-query';

import { postBasicAuction } from '@/apis/queryFunctions/basicAuction';
import { PostBasicAuctionParams } from '@/apis/types/basicAuction';

function usePostBasicAuction() {
  const queryClient = useQueryClient();

  const { mutate, error } = useMutation({
    mutationFn: (param: PostBasicAuctionParams) => postBasicAuction(param),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['basicAuctionList'] });
    },
  });

  return { mutate, error };
}

export default usePostBasicAuction;
